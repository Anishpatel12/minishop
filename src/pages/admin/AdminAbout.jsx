
// src/pages/admin/AdminAbout.jsx

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";

export default function AdminAbout() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      companyName: "",
      description: "",
      mission: "",
      vision: "",
      email: "",
      phone: "",
      address: "",
      founderName: "",
      founderImage: "",
      bannerImage: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout =
    async () => {
      try {
        const { data } =
          await API.get("/about");

        if (data) {
          setForm({
            companyName:
              data.companyName || "",

            description:
              data.description || "",

            mission:
              data.mission || "",

            vision:
              data.vision || "",

            email:
              data.email || "",

            phone:
              data.phone || "",

            address:
              data.address || "",

            founderName:
              data.founderName || "",

            founderImage:
              data.founderImage || "",

            bannerImage:
              data.bannerImage || "",

            facebook:
              data.facebook || "",

            instagram:
              data.instagram || "",

            twitter:
              data.twitter || "",

            youtube:
              data.youtube || "",
          });
        }
      } catch (error) {
        console.log(error);

        toast.error(
          "Failed to load About data"
        );
      }
    };

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await API.put(
          "/about",
          form
        );

        toast.success(
          "About Page Updated Successfully"
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Update Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        About Page Settings
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        {/* Company Name */}
        <div>
          <label className="font-semibold">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={
              form.companyName
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Mission */}
        <div>
          <label className="font-semibold">
            Mission
          </label>

          <textarea
            rows="3"
            name="mission"
            value={
              form.mission
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Vision */}
        <div>
          <label className="font-semibold">
            Vision
          </label>

          <textarea
            rows="3"
            name="vision"
            value={
              form.vision
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="font-semibold">
            Address
          </label>

          <textarea
            rows="3"
            name="address"
            value={
              form.address
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Founder */}
        <div>
          <label className="font-semibold">
            Founder Name
          </label>

          <input
            type="text"
            name="founderName"
            value={
              form.founderName
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-semibold">
            Founder Image URL
          </label>

          <input
            type="text"
            name="founderImage"
            value={
              form.founderImage
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Banner */}
        <div>
          <label className="font-semibold">
            Banner Image URL
          </label>

          <input
            type="text"
            name="bannerImage"
            value={
              form.bannerImage
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        {/* Social Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="facebook"
            placeholder="Facebook URL"
            value={
              form.facebook
            }
            onChange={
              handleChange
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="instagram"
            placeholder="Instagram URL"
            value={
              form.instagram
            }
            onChange={
              handleChange
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="twitter"
            placeholder="Twitter URL"
            value={
              form.twitter
            }
            onChange={
              handleChange
            }
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="youtube"
            placeholder="YouTube URL"
            value={
              form.youtube
            }
            onChange={
              handleChange
            }
            className="border rounded-xl p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
        >
          {loading
            ? "Saving..."
            : "Save About Page"}
        </button>
      </form>
    </div>
  );
}

