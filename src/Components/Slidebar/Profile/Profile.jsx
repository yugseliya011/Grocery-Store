import React, {useEffect, useState} from "react";
import styles from "./Profile.module.scss";
import {IoCameraSharp} from "react-icons/io5";
import {FaUserCircle} from "react-icons/fa";
import {IoArrowBack} from "react-icons/io5";
import {MdClose} from "react-icons/md";

export default function Profile({onClose, onClick}) {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        number: "",
        avatarUrl: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState(profile);

    // Fetch user details on mount
    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem("users"))?.find(
            (user) => user.username === JSON.parse(localStorage.getItem("authUser"))
        );
        if (storedProfile) {
            setProfile(storedProfile);
            setEditProfile(storedProfile);
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEditProfile({...editProfile, [name]: value});
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newAvatarUrl = reader.result;
                setEditProfile((prev) => ({...prev, avatarUrl: newAvatarUrl}));
                setProfile((prev) => ({...prev, avatarUrl: newAvatarUrl}));

                // Update localStorage
                const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
                const updatedUsers = existingUsers.map((user) => (user.username === profile.username ? {...user, avatarUrl: newAvatarUrl} : user));
                localStorage.setItem("users", JSON.stringify(updatedUsers));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        setProfile(editProfile);
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = existingUsers.map((user) => (user.username === profile.username ? editProfile : user));
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setIsEditing(false);
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.Profile}>
                <div className={styles.add_back}>
                    <button
                        onClick={() => {
                            onClick(); // This will open the sidebar
                            onClose(); // This will close the profile
                        }}
                    >
                        <IoArrowBack />
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <MdClose />
                    </button>
                </div>
                <div className={styles.profile_view}>
                    {isEditing ? (
                        <div className={styles.edit_mode}>
                            <div className={styles.imgCont}>
                                <div className={styles.avatar_input_container}>
                                    {editProfile.avatarUrl ? (
                                        <img src={editProfile.avatarUrl} alt="Profile Avatar" className={styles.avatar} />
                                    ) : (
                                        <FaUserCircle size={50} className={styles.default_avatar} />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className={styles.avatar_input}
                                        id="avatarInput"
                                    />
                                    <label htmlFor="avatarInput" className={styles.icon_label}>
                                        <IoCameraSharp className={styles.camera_icon} />
                                    </label>
                                </div>
                            </div>
                            <label>
                                Name:
                                <input type="text" name="name" value={editProfile.name} onChange={handleChange} className={styles.input} />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={editProfile.email} onChange={handleChange} className={styles.input} />
                            </label>
                            <button onClick={handleSave} className={styles.save_button}>
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className={styles.cancel_button}>
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <>
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt="Profile Avatar" className={styles.avatar} />
                            ) : (
                                <FaUserCircle size={50} className={styles.default_avatar} />
                            )}
                            <div className={styles.profile_detail}>
                                <span className={styles.name}>{profile.name}</span>
                                <span className={styles.number}>{profile.number}</span>
                                <span className={styles.email}>{profile.email}</span>
                            </div>
                            <button onClick={() => setIsEditing(true)} className={styles.edit_button}>
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
