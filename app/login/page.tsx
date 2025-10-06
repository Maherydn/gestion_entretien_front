import FormLogin from "./_components/FormLogin";
import { Pacifico  } from 'next/font/google'
 
const pacifico = Pacifico ({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-Pacifico",
})

const page = () => {
  return (
    <section className="flex h-screen w-full">
      <div className="bg-slate-400 bg-[url('/images/fond_login.webp')] bg-cover bg-no-repeat bg-center h-screen w-full flex-1 flex justify-center items-center px-24 geist.className max-md:hidden" >
        <p className={`${pacifico.variable} text-white text-justify justify-center text-xl`}>Bienvenue sur <span className="uppercase">&quot;check&quot;</span> l&apos;application qui vous aidera à maintenir vos véhicules en bonne santé</p>
      </div>
      <div className="bg-vert h-screen w-2/5 max-md:w-full flex justify-center items-center">
        <FormLogin />
      </div>
    </section>
  );
};

export default page;
