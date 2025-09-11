const FormLogin = () => {
    return (
        <div className="bg-jaune flex flex-col gap-10 w-80 p-6 h-fit rounded-xl">
          <h2 className="text-2xl text-vert uppercase font-bold">login</h2>
          <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email ou téléphone</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Entrez votre email ou téléphone"
                required
                className="px-3 py-2 rounded bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Entrez votre mot de passe"
                required
                className=" px-3 py-2 rounded bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 border rounded cursor-pointer bg-vert text-white"
            >
              Se connecter
            </button>
          </form>
        </div>
    );
}

export default FormLogin;