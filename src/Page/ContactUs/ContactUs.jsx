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
    <div className="relative w-full min-h-screen py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-6xl mx-auto rounded-xl bg-white dark:bg-gray-900 shadow-2xl px-6 py-10 md:px-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Get In Touch
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Whether you have a question, want to work together, or just want to say hello, I'm always open to meaningful conversations.
        </p>

        <div className="md:flex gap-12 items-start justify-between">
          {/* Contact Info */}
          <div className="md:w-1/2 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Contact Details</h3>

            {[
              {
                icon: <MdEmail className="text-xl" />,
                color: "blue",
                text: "md.habiburrahmanjwd@gmail.com",
              },
              {
                icon: <FaPhoneAlt className="text-lg" />,
                color: "green",
                text: "+880 1742923499",
              },
              {
                icon: <FaSquareWhatsapp className="text-xl" />,
                color: "emerald",
                text: whatsappNumber,
              },
              {
                icon: <IoHome className="text-2xl" />,
                color: "purple",
                text: "Rajshahi, Bangladesh",
              },
            ].map(({ icon, color, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div
                  className={`p-3 bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-300 rounded-full shadow-inner`}
                >
                  {icon}
                </div>
                <span className="text-gray-700 dark:text-gray-200 break-words">{text}</span>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            className="md:w-1/2 mt-10 md:mt-0 space-y-6"
          >
            {[
              {
                label: "Your Name",
                name: "name",
                type: "text",
                placeholder: "John Doe",
              },
              {
                label: "Your Email",
                name: "email",
                type: "email",
                placeholder: "john@example.com",
              },
            ].map(({ label, name, type, placeholder }) => (
              <div className="space-y-2" key={name}>
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  required
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="block text-gray-700 dark:text-gray-300 font-medium">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;