"use client"
import React, { useEffect,useState } from 'react';
import {createClient} from '@/lib/supabase/client';
import Link from 'next/link'
import Image from 'next/image';

const supabase = createClient();
export default function Dashboardpage(){

    const [stats, setStats] = useState(null);
    const [username, setUsername] = useState("");
    const [search,setsearch] = useState("");
    const [userMail, setUserMail] = useState("");

    useEffect(()=>{
        loadData();

    },[]);

    async function loadData(){
        const {data} = await supabase.auth.getUser();
        const user = data?.user;

        const name = user?.user_metadata.name;
        const email = user?.user_metadata.email;
        setUserMail(email);
        setUsername(name);

    }
    return(
        <><div>
            <div className='fixed top-0 w-full z-40 backdrop-blur-md bg-slate-900/80 border-b border-slate-700'>
            <div>
                <img src="/rudit-logo.png"className='h-16 w-auto' alt="Rudit Logo" />
                </div>
                <div></div>
                </div>
            
            <div className='pt-40'><h1 className='font-bold text-2xl '>Dashboard</h1>
            <p> welcome back! {username? `, ${username}`:"loading Dashboard please wait"} Here's your what we have for you today</p>
            <p></p></div>
        </div>
       
        </>
    )

}