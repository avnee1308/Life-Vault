import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    return (

        <div className="h-screen flex items-center justify-center bg-slate-100">

            <button
                onClick={() => navigate("/dashboard")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg"
            >
                Enter LifeVault
            </button>

        </div>

    );
}

export default Login;