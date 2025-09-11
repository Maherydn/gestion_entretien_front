import FormLogin from "./_components/FormLogin";

const page = () => {
  return (
    <section className="flex h-screen w-full">
      <div className="bg-slate-400 flex-1 flex justify-center items-center px-24">
        <p className=" text-4xl text-white text-center">Bienvenue sur <span className="uppercase">&quot;check&quot;</span> l&apos;application qui vous aidera à maintenir votre véhicules en bonne santé</p>
      </div>
      <div className="bg-vert h-full w-2/5 flex justify-center items-center">
        <FormLogin />
      </div>
    </section>
  );
};

export default page;
