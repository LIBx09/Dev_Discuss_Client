import { useForm } from "react-hook-form";
import useAxios from "../../MainLayout/Shared/Hooks/useAxios";
import moment from "moment";
import Swal from "sweetalert2";
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";

const AddBlog = () => {
    const axios = useAxios();
    const {user}=useContext(AuthContext)
    const userInfo = {
        name:user?.displayName,
        email:user?.email,
    }
    const { register, handleSubmit, reset } = useForm();
    
    const onSubmit = data => {
        console.log(data);
        const date = moment().format("MMM Do YY");
        const updateData = { ...data, date,userInfo };
        console.log(updateData)
        axios.post("/blogs", updateData)
            .then(res => {
                reset();
                console.log(res.data);
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: "Success",
                        text: "Blog added successfully!",
                        icon: "success",
                        draggable: true
                    });
                }
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    title: "Error",
                    text: "Failed to add blog",
                    icon: "error",
                    draggable: true
                });
            })
    }
    
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="md:text-3xl md:pt-6 pt:0 font-semibold text-lg">Add a New Blog</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend md:text-xl text-md">Heading</legend>
                    <p className="fieldset-label">Add a catchy heading for your blog</p>
                    <input 
                        {...register("heading", { required: true })} 
                        type="text" 
                        required 
                        className="input w-full" 
                        placeholder="Enter a heading for your blog" 
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend md:text-xl text-md">Title</legend>
                    <p className="fieldset-label">Add a descriptive title that summarizes your blog</p>
                    <input 
                        {...register("title", { required: true })} 
                        type="text" 
                        required 
                        className="input w-full" 
                        placeholder="Enter a title for your blog" 
                    />
                </fieldset>

                <fieldset className="fieldset">
                    <legend className="fieldset-legend md:text-xl text-md">Content</legend>
                    <p className="fieldset-label">Write your blog content here</p>
                    <textarea 
                        {...register("content", { required: true })} 
                        required 
                        className="textarea min-h-60 w-full row-span-12" 
                        placeholder="Enter your blog content here"
                    ></textarea>
                </fieldset>

          

                <button className="bg-blue-500 hover:bg-blue-700 rounded-sm text-white px-2 py-2 font-semibold mt-8">
                    Add Your Blog
                </button>
            </form>
        </div>
    );
};

export default AddBlog;