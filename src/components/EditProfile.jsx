import React, { useState } from 'react';
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BaseUrl } from '../utils/constant';
import Card from './Card';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [skills, setSkills] = useState(user.skills || []);
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl||null);  
    const [age, setAge] = useState(user.age || "");
    const [githubUsername, setGithubUsername] = useState(user.githubUsername || "");
    const [error, setError] = useState("");

    const [toast, setToast] = useState(false);

    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
        const value = e.target.value;
        const skillArray = value.split(",").map((skill) => skill.trim());
        setSkills(skillArray);
    };

    const handleUpdate = async () => {
        setError("");
        try {

            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('skills', skills.join(', '));
            formData.append('gender', gender);
            formData.append('about', about);
            formData.append('age', age);
            formData.append("githubUsername",githubUsername)

             
            if (photoUrl) {
                formData.append('photoUrl', photoUrl); 
            }

            const res = await axios.patch(`${BaseUrl}/profile/edit`, formData, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            dispatch(addUser(res?.data?.data));
            setToast(true);
            setTimeout(() => {
                setToast(false);
            }, 3000);
        } catch (error) {
            setError(error?.response?.data || "Something went wrong");
            
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhotoUrl(file);  
    };

    return (
        <>
            <div className="flex flex-wrap justify-center gap-10 my-10 px-4 sm:px-8">
                <div className="flex justify-center mx-10">
                    <div className="card bg-blue-100 w-full sm:w-96 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title justify-center text-cyan-950">Edit Profile</h2>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">First Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="Type here"
                                    className="input input-bordered input-accent w-full bg-cyan-50"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">Last Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={lastName}
                                    placeholder="Type here"
                                    className="input input-bordered input-accent w-full bg-cyan-50"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">Github Username</span>
                                </div>
                                <input
                                    type="text"
                                    value={githubUsername}
                                    placeholder="Type here"
                                    className="input input-bordered input-accent w-full bg-cyan-50"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">Age</span>
                                </div>
                                <input
                                    type="number"
                                    value={age}
                                    placeholder="Type here"
                                    className="input input-bordered input-accent w-full bg-cyan-50"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">Gender</span>
                                </div>
                                <select
                                    className="select select-accent w-full bg-cyan-50 text-cyan-800"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled>Select your gender</option>
                                    <option>male</option>
                                    <option>female</option>
                                    <option>others</option>
                                </select>
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">Photo</span>
                                </div>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-accent w-full bg-cyan-50"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">Skills</span>
                                </div>
                                <input
                                    type="text"
                                    value={skills?.join(", ")}
                                    placeholder="Type skills separated by commas"
                                    className="input input-bordered input-accent w-full bg-cyan-50"
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="form-control w-full my-2">
                                <div className="label">
                                    <span className="label-text text-cyan-800">About</span>
                                </div>
                                <textarea
                                    className="textarea textarea-accent bg-cyan-50 text-cyan-800"
                                    value={about}
                                    placeholder="About yourself"
                                    onChange={(e) => setAbout(e.target.value)}
                                ></textarea>
                            </label>
                            <p className="text-red-800">{error}</p>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-accent" onClick={handleUpdate}>
                                    Save Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Card user={{ firstName, lastName, about, skills, age, gender, photoUrl }} />
                </div>
            </div>
            {toast && (
                <div className="toast toast-top toast-center mx-4">
                    <div className="alert alert-info">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;
