import { useState } from "react";
import { useAuthStore, User } from "../store/useAuthStore";
import CameraIcon from "../icons/CameraIcon";
import ArrowBackIcon from "../icons/ArrowBackIcon";
import { Link } from "react-router-dom";
import PersonIcon from "../icons/PersonIcon";
import MailIcon from "../icons/MailIcon";
import defaultProfile from "../public/profile.png";
import Button from "@/components/Button";

function UpdateProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile, removeAvatar } =
    useAuthStore();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));

    updateProfile(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);

    removeAvatar();
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 pt-18 pb-10 max-w-[calc(1250px)] m-auto  border-t-1 dark:border-zinc-800 border-indigo-100 relative ">
        <span>
          <Link
            to="/dashboard"
            className="px-5 py-2 text-sm rounded-sm dark:bg-zinc-800/60 bg-indigo-50/50 hover:scale-103 absolute top-5 left-5 flex gap-2 items-center cursor-pointer transition-all border-1 dark:border-zinc-800 border-indigo-100  shadow-xs"
          >
            Back <ArrowBackIcon className="size-4" />{" "}
          </Link>
        </span>
        <p className="text-xl font-medium mb-3">Your Profile</p>
        <div className="relative ">
          <img
            src={selectedImage || authUser?.avatar || defaultProfile}
            alt=""
            className="w-40 h-40 rounded-full border-1"
          />
          <label
            htmlFor="avatar"
            className="absolute right-4 bottom-2 dark:bg-zinc-900 bg-white p-1.5 rounded-full cursor-pointer border-1  "
          >
            <CameraIcon className="size-6" />
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              accept="image"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>

        {authUser?.avatar !== "" && (
          <div className="flex gap-7 items-center ">
            <Button
              variant="delete"
              text={"Remove avatar"}
              onClick={handleRemoveImage}
            ></Button>
          </div>
        )}

        <div className=" transition-all flex flex-col gap-4 w-80 text-sm cursor-not-allowed py-8 ">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Name</p>
            <p className=" border-1 dark:border-zinc-800 border-indigo-50 rounded-sm px-4 py-2 flex items-center gap-3 dark:bg-zinc-800/40 bg-indigo-50/50 ">
              <PersonIcon /> {(authUser as User).firstName}{" "}
              {(authUser as User).lastName}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Email</p>
            <p className="border-1  dark:border-zinc-800 border-indigo-50 rounded-sm px-4 py-2 flex items-center gap-3 dark:bg-zinc-800/40 bg-indigo-50/50 ">
              <MailIcon /> {(authUser as User).email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfilePage;
