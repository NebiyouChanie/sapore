import { Phone } from "lucide-react";
import BookingForm from './BookingForm';
import * as motion from "motion/react-client";

function BookingSection() {
  return (
    <section id="booking" className="py-16 md:py-24">
      <div className="container px-4 md:px-10 xl:px-64 2xl:px-76 mx-auto ">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Booking Form Section with Animation */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}  // Form slides from left to right
            initial={{ opacity: 0, x: -100 }}  // Form starts from left
            transition={{ duration: 1.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}  // Trigger when 50% of the element is visible
          >
            <BookingForm />
          </motion.div>
          
          {/* Text Section with Animation */}
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}  // Text slides from right to left
            initial={{ opacity: 0, x: 100 }}  // Text starts from right
            transition={{ duration: 1.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}  // Trigger when 50% of the element is visible
          >
            <div>
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-medium mb-4">Opening hours</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-gray-500">Monday - Saturday: 7:30 AM - 10:00 PM</p>
                      <p className="text-gray-500">Sunday: 11:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="font-playfair text-xl font-medium mb-4">How booking works</h3>
                <p className="text-gray-500 mb-2">1. Fill out the booking form with your details</p>
                <p className="text-gray-500 mb-2">2. Receive confirmation via email</p>
                <p className="text-gray-500">3. Arrive and enjoy your meal!</p>
              </div>
              <div>
                <h3 className="font-playfair text-xl font-medium mb-4">Book directly</h3>
                <div className="flex items-center gap-3">
                  <Phone className="shrink-0" size={18} />
                  <p className="text-gray-500">+251 911439712 / +251 988438888</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default BookingSection;
