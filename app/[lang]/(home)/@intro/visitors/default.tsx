export default function CustomIntro({lang}: {lang: string}) {
    const name = "Juan"
    const business = ""
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
    </section>
  )
}