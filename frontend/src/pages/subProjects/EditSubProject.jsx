import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { AiOutlineHome } from "react-icons/ai";
import Breadcrumb from "../../components/Breadcrumbs";

const EditSubProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/subproject/get/${id}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [id, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:5000/subproject/edit/${id}`,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };
  const breadcrumbItems = [
    { path: "/", label: "Home", icon: AiOutlineHome },
    { path: "/projects", label: "projects" },
    { path: `/subproject/edit/${id}`, label: "edit-episode", color: "#7E22CE" },
  ];
  return (
    <>
      <Navbar />
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#7E22CE]">
            Edit Episode
          </h2>
          <form className="w-full" onSubmit={handleEdit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-lg font-medium mb-2 text-[#7E22CE]"
              >
                Episode Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Edit Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-2 text-[#7E22CE]"
              >
                Description
              </label>
              <textarea
                name="description"
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#7E22CE] text-white font-medium px-4 py-2 rounded-lg"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSubProject;