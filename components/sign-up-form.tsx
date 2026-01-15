"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { LocateFixed, Sparkles, CheckCircle2, Loader2, Upload } from 'lucide-react'; // Added Upload icon
import { createClient } from '@/lib/supabase/client'; // Assuming Supabase client is available here
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const supabase = createClient(); // Initialize Supabase client

const FIELD_ORDER = [
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword',
  // 'role', // Removed
  'gradeLevel', // Assuming this field exists somewhere, otherwise it won't receive focus
  'numberOfStudents', // Assuming this field exists somewhere, otherwise it won't receive focus
  'location', // Assuming this field exists somewhere, otherwise it won't receive focus
  'logoUpload', // Added for the logo upload button
  'terms',
  'submit'
];

export function SignUpForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeLevel, setGradeLevel] = useState<number[]>([9]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [activeVoiceField, setActiveVoiceField] = useState<string | null>(null);
  // Add schoolName and schoolSlug states
  const [schoolName, setSchoolName] = useState('');
  const [schoolSlug, setSchoolSlug] = useState('');


  // Logo upload states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputRefs = useRef<Record<string, any>>({});
  const autoAdvanceTimer = useRef<NodeJS.Timeout | null>(null);

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile) return null;

    setIsSubmitting(true);
    const filePath = `school_logos/${uuidv4()}-${logoFile.name}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, logoFile, {
        upsert: true,
      });

    if (uploadError) {
      console.error('Error uploading logo:', uploadError);
      setIsSubmitting(false);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    setLogoUrl(publicUrl);
    setIsSubmitting(false);
    return publicUrl;
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
    } else {
      setLogoFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    let uploadedLogoUrl: string | null = null;
    if (logoFile) {
      uploadedLogoUrl = await uploadLogo();
      if (!uploadedLogoUrl) {
        setSuccessMessage('Failed to upload logo. Please try again.');
        setIsSubmitting(false);
        return;
      }
    }

    // Simulate an API call for user signup and school creation
    try {
      // Example of how you might save to Supabase (adjust as per your actual schema)
      // This is a placeholder for your actual signup logic.
      const { data: user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            // role: role, // if you reintroduce role
            // grade_level: gradeLevel[0], // if you reintroduce gradeLevel
          }
        }
      });

      if (signUpError) throw signUpError;

      if (user?.user) {
        // Assuming a school table linked to user profiles
        const { error: schoolError } = await supabase.from('schools').insert({
          // You'd typically link this to the user's profile or create a profile for them
          // For simplicity, directly saving logo_url here. Adjust based on your schema.
          id: user.user.id, // Assuming a id column to link school to the signed-up user
          name: schoolName,
          slug: schoolSlug,
          logo_url: uploadedLogoUrl,
          // other school data if any
        });

        if (schoolError) throw schoolError;
      }


      setIsSubmitting(false);
      setIsSuccess(true);
      setSuccessMessage('Sign up successful! Please check your email for a confirmation link.');
      speak("Sign up successful. Please check your email for a confirmation link.");

    } catch (error: any) {
      console.error('Signup error:', error.message);
      setSuccessMessage(`Sign up failed: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  const triggerAdvance = useCallback((currentFieldId: string, delay: number = 4000) => {
    if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    const currentIndex = FIELD_ORDER.indexOf(currentFieldId);
    if (currentIndex !== -1 && currentIndex < FIELD_ORDER.length - 1) {
      autoAdvanceTimer.current = setTimeout(() => {
        const nextFieldId = FIELD_ORDER[currentIndex + 1];
        const nextInput = inputRefs.current[nextFieldId];
        if (nextInput) {
          nextInput.focus();
        }
      }, delay);
    }
  }, []);

  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [password]);

  const handleFocus = (fieldId: string) => {
    if (isSuccess) return;
    setActiveVoiceField(fieldId);
    const prompts: Record<string, string> = {
      firstName: "Welcome! Let's start with your first name.",
      lastName: "Excellent. Now, type your last name.",
      email: "I will need your email address next.",
      password: "Choose a strong password. I'll watch the strength for you.",
      confirmPassword: "Confirm that password one more time.",
      schoolName: "What is the name of your school?", // Add prompt for school name
      schoolSlug: "Enter a unique web address for your school.", // Add prompt for school slug
      gradeLevel: "Slide to set your current grade level.",
      logoUpload: "Please upload your school's logo.",
      terms: "Lastly, agree to our terms and conditions.",
      submit: "You are all done. You can now submit the form."
    };
    if (prompts[fieldId]) speak(prompts[fieldId]);
  };

  const onUserTyping = (fieldId: string, valueSetter: (v: any) => void, val: any) => {
    valueSetter(val);
    if (val.length > 1) triggerAdvance(fieldId, 5000);
  };

  // New Keydown handler for Enter key navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default form submission on enter

      const target = e.target as HTMLElement;
      // Use dataset.fieldid for custom inputs, or check tag for native inputs
      const focusedFieldId = target.dataset.fieldid || (target.tagName === 'INPUT' ? (target as HTMLInputElement).name : undefined);


      if (focusedFieldId) {
        const currentIndex = FIELD_ORDER.indexOf(focusedFieldId);
        if (currentIndex !== -1 && currentIndex < FIELD_ORDER.length - 1) {
          const nextFieldId = FIELD_ORDER[currentIndex + 1];
          const nextInput = inputRefs.current[nextFieldId];
          if (nextInput) {
            // For file input, trigger click
            if (nextFieldId === 'logoUpload' && fileInputRef.current) {
              fileInputRef.current.click();
            } else {
              nextInput.focus();
            }
          }
        } else if (focusedFieldId === 'submit') {
          // If Enter is pressed on the submit button, trigger form submission
          handleSubmit(e as any);
        }
      }
    }
  }, [triggerAdvance, handleSubmit]); // Include handleSubmit in dependencies

  const getHighlightRing = (id: string) =>
    activeVoiceField === id
      ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50/30 dark:bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800";

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-950 p-4 transition-colors duration-500">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl p-8 border border-slate-200 dark:border-slate-800">

        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold mb-4 uppercase tracking-widest">
            <Sparkles size={14} /> Guided Experience
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {isSuccess ? "Welcome Aboard!" : "Create Your Account"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {isSuccess ? successMessage : "Listen to the instructions as you fill out the form."}
          </p>
        </div>

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 font-medium">First Name</Label>
              <Input
                disabled={isSuccess}
                ref={el => { inputRefs.current.firstName = el; }}
                value={firstName}
                onChange={(e) => onUserTyping('firstName', setFirstName, e.target.value)}
                onFocus={() => handleFocus('firstName')}
                data-fieldid="firstName"
                className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('firstName')}`}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 font-medium">Last Name</Label>
              <Input
                disabled={isSuccess}
                ref={el => { inputRefs.current.lastName = el; }}
                value={lastName}
                onChange={(e) => onUserTyping('lastName', setLastName, e.target.value)}
                onFocus={() => handleFocus('lastName')}
                data-fieldid="lastName"
                className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('lastName')}`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 font-medium">Email Address</Label>
            <Input
              disabled={isSuccess}
              type="email"
              ref={el => { inputRefs.current.email = el; }}
              value={email}
              onChange={(e) => onUserTyping('email', setEmail, e.target.value)}
              onFocus={() => handleFocus('email')}
              data-fieldid="email"
              className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('email')}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 font-medium">Password</Label>
              <Input
                disabled={isSuccess}
                type="password"
                ref={el => { inputRefs.current.password = el; }}
                value={password}
                onChange={(e) => onUserTyping('password', setPassword, e.target.value)}
                onFocus={() => handleFocus('password')}
                data-fieldid="password"
                className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('password')}`}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300 font-medium">Confirm Password</Label>
              <Input
                disabled={isSuccess}
                type="password"
                ref={el => { inputRefs.current.confirmPassword = el; }}
                value={confirmPassword}
                onChange={(e) => onUserTyping('confirmPassword', setConfirmPassword, e.target.value)}
                onFocus={() => handleFocus('confirmPassword')}
                data-fieldid="confirmPassword"
                className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('confirmPassword')}`}
              />
            </div>
          </div>

          {/* School Name Input */}
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 font-medium">School Name</Label>
            <Input
              disabled={isSuccess}
              type="text"
              id="school-name"
              placeholder="Ruditt Academy"
              value={schoolName}
              onChange={(e) => onUserTyping('schoolName', setSchoolName, e.target.value)}
              onFocus={() => handleFocus('schoolName')}
              data-fieldid="schoolName"
              className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('schoolName')}`}
              ref={el => { inputRefs.current.schoolName = el; }}
            />
          </div>

          {/* School Slug Input */}
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 font-medium">School Slug</Label>
            <Input
              disabled={isSuccess}
              type="text"
              id="school-slug"
              placeholder="ruditt-academy"
              value={schoolSlug}
              onChange={(e) => onUserTyping('schoolSlug', setSchoolSlug, e.target.value)}
              onFocus={() => handleFocus('schoolSlug')}
              data-fieldid="schoolSlug"
              className={`h-12 text-slate-900 dark:text-white transition-all duration-300 ${getHighlightRing('schoolSlug')}`}
              ref={el => { inputRefs.current.schoolSlug = el; }}
            />
          </div>

          {/* Logo Upload Section */}
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 font-medium">School Logo</Label>
            <div
              className={`flex items-center justify-center p-4 h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${getHighlightRing('logoUpload')}`}
              onClick={() => fileInputRef.current?.click()}
              onFocus={() => handleFocus('logoUpload')}
              tabIndex={0} // Make div focusable
              data-fieldid="logoUpload"
              ref={el => { inputRefs.current.logoUpload = el; }}
            >
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleLogoChange}
                className="hidden"
                disabled={isSuccess || isSubmitting}
              />
              {logoFile ? (
                <p className="text-slate-900 dark:text-white text-sm font-medium">{logoFile.name}</p>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload size={24} className="text-slate-400 dark:text-slate-500" />
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Click to upload or drag and drop</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <Checkbox
              disabled={isSuccess}
              id="terms"
              ref={el => { inputRefs.current.terms = el as any; }}
              checked={agreeToTerms}
              onCheckedChange={(v) => { setAgreeToTerms(!!v); triggerAdvance('terms', 2000); }}
              onFocus={() => handleFocus('terms')}
              data-fieldid="terms"
              className="border-slate-400 dark:border-slate-500"
            />
            <Label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
              I agree to the <span className="text-blue-600 dark:text-blue-400 underline">Terms and Conditions</span>
            </Label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || isSuccess || !agreeToTerms} // Disable if terms not agreed
            ref={el => { inputRefs.current.submit = el; }}
            onFocus={() => handleFocus('submit')}
            data-fieldid="submit"
            className={`w-full h-14 text-lg font-bold transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
              isSuccess
                ? 'bg-green-600 hover:bg-green-600'
                : activeVoiceField === 'submit' ? 'bg-blue-600 dark:bg-blue-500' : 'bg-slate-900 dark:bg-slate-100 dark:text-slate-900'
            }`}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : null}
            {isSuccess ? (
              <>
                <CheckCircle2 /> Registered
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}