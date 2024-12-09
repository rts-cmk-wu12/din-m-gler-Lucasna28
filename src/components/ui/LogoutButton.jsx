"use client"

export default function LogoutButton(){
    const handleLogout = () => {
        document.cookie = "dm_token=; Max-Age=0; Path=/;"
        document.cookie = "dm_userid=; Max-Age=0; Path=/;"
    
        window.location.reload()
    }

    return(
        <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white transition-colors"
        >
            log ud
        </button>
    )
    
}