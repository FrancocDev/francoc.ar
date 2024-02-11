"use client"
import Mousetrap from "mousetrap"
import { useEffect } from "react"
import {Toaster, toast } from 'sonner';

export default function CustomIntro({lang}: {lang: string}) {
  const name = "Juan"
  const business = ""
  const firstWord = "hola"
  
  useEffect(() => {
    Mousetrap.bind(firstWord.toLowerCase().split("").join(" "), () => {
      console.log("Hola")
      if(lang === "es") {
        toast(`Buenas ${name}, me alegra mucho que hayas pasado por mi portfolio!`, {duration: 5000})
      } else {
        toast(`Hi ${name},  I'm so glad you visited my portfolio!`, {duration: 5000})
      }
    })
  });

  return (
  <section className="mb-16 dark:bg-slate-900 bg-slate-100 p-4 rounded-md ">
      {lang === "es" ? 
        (
         <>
          Hola <strong>{name}</strong>, muchas gracias por visitar mi portfolio.<br/>
          Espero te guste ya que me gusta mucho {business} y me encantaría formar parte del equipo.
          </>
        ) :
        (
          <>
           Hi <strong>{name}</strong>, thanks for visiting my portfolio!<br/>
           I hope you like it because I really like {business} and would love to be part of the team!
          </>)
      }
  <Toaster position="bottom-center" toastOptions={{
    unstyled: true,
    classNames: {
      toast: 'text-black dark:text-white bg-slate-100 dark:bg-slate-900 text-white p-2 rounded-md shadow-md',
    }
  }}/>
  </section>
)
}