import React, { useState } from "react";
import { useStore } from "../store/store";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const AddDoctor = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        clinic_phno: null,
        specialization: "",
        degree: "",
        password: "",
        address: "",
        experience: null,
        fees: null,
        about: "",
        image: null
    });
    const [loading, setLoading] = useState(false);
    const sidebar = useStore((state) => state.sidebar)

    const handleChange = (e) => {
        setForm((prev) => { return { ...prev, [e.target.name]: e.target.value } });
    };
    const handlFileChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => { return { ...prev, [e.target.name]: file } });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.clinic_phno?.length < 8 || form.clinic_phno?.length > 10 || form.clinic_phno?.length == 9) {
            toast.error("Enter valid clinic_phno number....");
            return;
        }
        // make the api call to pass data
        const formdata = new FormData();
        formdata.append("name", form.name);
        formdata.append("email", form.email);
        formdata.append("clinic_phno", form.clinic_phno);
        formdata.append("specialization", form.specialization);
        formdata.append("degree", form.degree);
        formdata.append("password", form.password);
        formdata.append("address", form.address);
        formdata.append("experience", form.experience);
        formdata.append("fees", form.fees);
        formdata.append("about", form.about);

        if (form.image instanceof File) {
            formdata.append("image", form.image);
        }

        console.log("Adding doctor", formdata);
        try {
            setLoading(true);
            axios.post(`${API_URL}/admin/add-doctor`, formdata, {
                withCredentials: true
            })
                .then(res => {
                    toast.success("Doctor added successfully");
                    console.log(res.data);
                })
                .catch(err => {
                    toast.error(err.response.data.message || "Failed to add doctor. Please try again.");
                    console.log(err);
                })
                .finally(() => clearForm());
            setLoading(false);
        } catch (err) {
            console.log(err);
        }

    }

    const clearForm = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            specialization: "",
            experience: "",
            fees: "",
            about: "",
            address: "",
            clinic_phno: "",
            degree: "",
            image: null
        });
    }

    if (loading) return (
        <div className="fixed inset-0 z-1 flex items-center bg-white">
            <Loader />
        </div>
    )
    return (
        <div className={`pt-25 pb-10 max-w-4xl mx-auto transition-all duration-300 ${sidebar ? "pl-10" : ""}`}>
            <h1 className="text-3xl font-bold text-indigo-700 mb-6">Add Doctor</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handlFileChange}
                        required
                    />
                    {form.image && (
                        <img
                            src={typeof form.image === "string" ? form.image : URL.createObjectURL(form.image)}
                            className="w-16 h-16 rounded-full object-cover border"
                            alt="preview"
                        />
                    )}
                </div>
                <div>
                    <label className="block font-medium text-violet-700 mb-1">Doctor Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Enter full name"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Specialization</label>
                    <input
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. Cardiologist"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="example@domain.com"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">clinic_phno/Phone Number</label>
                    <input
                        name="clinic_phno"
                        value={form.clinic_phno}
                        onChange={handleChange}
                        type="tel"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="8-digit clinic_phno number"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Degree</label>
                    <input
                        name="degree"
                        value={form.degree}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. MBBS, MD"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Experience (Years)</label>
                    <input
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        type="number"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. 5"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Fees</label>
                    <input
                        name="fees"
                        value={form.fees}
                        onChange={handleChange}
                        type="number"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="e.g. 500"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium text-violet-700 mb-1">Password</label>
                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Create a secure password"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium text-violet-700 mb-1">Address</label>
                    <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Full clinic_phno or hospital address"
                        required
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <label className="block font-medium text-violet-700 mb-1">Bio</label>
                    <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                        placeholder="Brief introduction or profile"
                    ></textarea>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
