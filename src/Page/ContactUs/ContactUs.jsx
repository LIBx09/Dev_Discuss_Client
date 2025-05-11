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
      style={{
        background: 'var(--background)',
        color: 'var(--text-color)'
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-xl mx-auto" style={{color: 'var(--text-color)'}}>
            I'm always open to discussions, collaborations, or just a friendly chat. Let's build something amazing together.
          </p>
          <div className="mt-4 w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Contact Info */}
          <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
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
                style={{
                  background: 'color-mix(in srgb, var(--background) 90%, var(--button-bg))'
                }}
              >
                <div 
                  className="p-3 text-white rounded-full shadow-inner"
                  style={{
                    background: 'var(--button-bg)'
                  }}
                >
                  {icon}
                </div>
                <span className="text-lg" style={{color: 'var(--text-color)'}}>{label}</span>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={onSubmit}
            className="flex-1 rounded-xl shadow-lg space-y-6 p-6"
            style={{
              background: 'color-mix(in srgb, var(--background) 90%, var(--button-bg))'
            }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
              Send a Message
            </h2>

            <div className="space-y-2">
              <label className="text-sm" style={{color: 'var(--text-color)'}}>Your Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--button-bg)',
                  color: 'var(--text-color)'
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm" style={{color: 'var(--text-color)'}}>Your Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--button-bg)',
                  color: 'var(--text-color)'
                }}
              />
            </div>

            <div className="space-y-2">
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message..."
                required
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition"
                style={{
                  background: 'var(--background)',
                  borderColor: 'var(--button-bg)',
                  color: 'var(--text-color)'
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-xl"
              style={{
                background: 'var(--button-bg)',
                '&:hover': {
                  background: 'var(--button-hover-bg)'
                }
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;