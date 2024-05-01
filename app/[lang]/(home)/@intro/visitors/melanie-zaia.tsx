"use client"
import Mousetrap from "mousetrap"
import { useEffect } from "react"
import {Toaster, toast } from 'sonner';

export default function CustomIntro({lang}: {lang: string}) {
  const name = "Melanie"
  const business = ""
  const firstWord = "Buscamos"
  
  useEffect(() => {
    Mousetrap.bind(firstWord.toLowerCase().split("").join(" "), () => {
      if(lang === "es") {
        toast(`Buenas ${name}, me alegra mucho que hayas pasado por mi portfolio!`, {duration: 5000})
      } else {
        toast(`Hi ${name},  I'm so glad you visited my portfolio!`, {duration: 5000})
      }
    })
  });

  return (
  <section className="mb-16 bg-gradient-to-r from-[#292AD4] via-[#781A82] to-[#F50005] p-4 rounded-md ">
      {lang === "es" ? 
        (
         <>
          Hola <strong>{name}</strong>, muchas gracias por visitar mi portfolio.<br/>
          Espero te guste ya que creo que creo que soy un buen candidato para la propuesta que publicaste en Linkedin.
          </>
        ) :
        (
          <>
           Hi <strong>{name}</strong>, thanks for visiting my portfolio!<br/>
           I hope you like it because I think that I could be a really good candidate for the position.
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