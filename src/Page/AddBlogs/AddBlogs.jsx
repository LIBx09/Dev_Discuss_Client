import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Helmet } from 'react-helmet';


import "react-datepicker/dist/react-datepicker.css";

const AddBlogs = (e) => {
    const [startDate, setStartDate] = useState(new Date());


    const handleAddBlog = () => {
        e.preventDefault();
        const from = e.target;
        const author = from.author.value;
        const image = from.photo.value;
        const title = from.title.value;
        const content = from.content.value;
        const date = from.date.value;

        const blogs = { author, image, title, content, date }
        console.log(blogs);
    }
    return (
        <div>
            <div className="max-w-5xl mx-auto m-6 bg-base-200">
                <div >
                    <Helmet>
                        <title>Add Blog | Blood Donation</title>
                    </Helmet>
                    <div className=" ">
                        <div>
                            <h1 className="text-4xl font-bold rancho text-center pt-8">Add Blog</h1>

                        </div>
                        <form className="card-body  shadow-2xl" onSubmit={handleAddBlog}>

                            <div>
                                <div className="lg:flex justify-center">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Author</span>
                                        </label>
                                        <br />
                                        <input type="text" name="author" placeholder="Enter Author Name" className="input input-bordered w-full lg:w-[600px]" required />

                                    </div>
                                </div>

                                <div className="lg:flex justify-center mt-3">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo</span>
                                        </label>
                                        <br />
                                        <input type="url" name="photo" placeholder="Enter you image url " className="input input-bordered w-full lg:w-[600px]" required />
                                    </div>
                                </div>
                                <div className="lg:flex justify-center mt-3">
                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Title</span>
                                        </label>
                                        <br />
                                        <input type="text" name="title" placeholder="Enter Title " className="input input-bordered w-full lg:w-[600px]" required />

                                    </div>
                                </div>
                                <div className="lg:flex justify-center mt-3">
                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Description</span>
                                        </label>
                                        <br />
                                        <textarea
                                            placeholder="write Description"
                                            name="content"
                                            className="textarea textarea-bordered textarea-lg w-full  lg:w-[600px]"></textarea>
                                    </div>
                                </div>


                                <div className="lg:flex justify-center mt-3">
                                    <div className="form-control ">
                                        <label className="label">
                                            <span className="label-text">Date </span>
                                        </label>
                                        <br />
                                        <DatePicker className="input input-bordered w-full  lg:w-[600px]" name="date" selected={startDate} onChange={(date) => setStartDate(date)} required />

                                    </div>
                                </div>



                                <div className="lg:flex justify-center mt-2">

                                    <button className="btn bg-black text-white border-2 border-[#331A15] rancho text-lg w-full lg:w-[600px] mt-6">Add Blog</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AddBlogs;