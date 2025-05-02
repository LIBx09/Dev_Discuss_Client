import { MdEmail } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const whatsappNumber = "+8801742923499";

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "c945b874-6631-4896-9c6b-da5c3e446e9c");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await res.json();

      if (result.success) {
        alert("Message sent successfully!");
        event.target.reset();
      } else {
        alert("Failed to send message. Try again!");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen px-4 py-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Get In Touch
          </h1>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto">
            I'm always open to discussions, collaborations, or just a friendly chat. Let’s build something amazing together.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Contact Details
            </h2>

            {[
              {
                icon: <MdEmail size={20} />,
                label: "md.habiburrahmanjwd@gmail.com",
              },
              {
                icon: <FaPhoneAlt size={18} />,
                label: "+880 1742923499",
              },
              {
                icon: <FaSquareWhatsapp size={22} />,
                label: whatsappNumber,
              },
              {
                icon: <IoHome size={24} />,
                label: "Rajshahi, Bangladesh",
              },
            ].map(({ icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
              >
                <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-full shadow-inner">
                  {icon}
                </div>
                <span className="text-lg text-gray-300">{label}</span>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <forma
            onSubmit={onSubmit}
            className="flex-1 rounded-xl  shadow-lg space-y-6"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
              Send a Message
            </h2>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Your Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            <div className="space-y-2">
              {/* <label className="text-sm text-gray-300">Message</label> */}
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg text-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              Send Message
            </button>
          </forma>
        </div>
      </div>
    </section>
  );
};

export default Contact;