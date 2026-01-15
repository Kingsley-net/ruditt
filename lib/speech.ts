export const speak = (text: string) => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.2; // A slightly faster pace
    window.speechSynthesis.speak(utterance);
  }
};
