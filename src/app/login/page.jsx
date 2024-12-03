"use client"
import login from "@/actions/login"
import { redirect } from "next/navigation"
import { useActionState, useEffect } from "react"
import {motion} from "framer-motion"
import PageHero from "@/components/ui/PageHero"
import Link from "next/link"


export default function LoginPage() {
	const [formState, formAction] = useActionState(login, null)

	useEffect(function() {
		if (!formState) return

		if (!formState.success) {
			alert("FEJL!!")
		}

		if (formState.success) {
			redirect("/")
		}
	}, [formState])


  return (
    <>
      <PageHero />
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className=" flex flex-col align-middle justify-center h-screen"
      >
        <form action={formAction}  className="w-full max-w-md mx-auto rounded-lg shadow-xl h-1/2 p-8 border-shape-shape01 border-2 flex flex-col justify-between">
        <h1 className="text-2xl font-bold text-center mb-6">Log ind på din konto</h1>
          <label className="flex flex-col my-2">Email
						<input type="email" name="identifier" placeholder="Email" className="border-gray-200 border-2 p-2"/>
					</label>
					<label className="flex flex-col">Adgangskode
						<input type="password" name="password" placeholder="Password" className="border-gray-200 border-2 p-2"/>
					</label>
				  <button type="submit" className="bg-primary-color01 text-white text-center w-full p-2">Log ind</button>
          <p>Log ind med</p>
          <div className="flex justify-between ">
            <button className="bg-primary-orange text-white p-3 w-1/3">Google</button>
            <button className="bg-primary-facebook text-white p-3 w-1/3 mx-4">Facebook</button>
            <button className="bg-primary-color01 text-white p-3 w-1/3">Twitter</button>
          </div>
          <p className="text-center">har du ikke en konto? <Link className="text-blue-400" href="/">opret bruger</Link></p>
			  </form>      
      </motion.section>
  </>
  )
}