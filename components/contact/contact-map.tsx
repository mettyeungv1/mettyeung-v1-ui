"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export function ContactMapSection() {
	return (
		<section className="w-full relative px-4 md:px-0 pb-12">
            <div className="container mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 relative bg-white ring-1 ring-gray-900/5">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.287265969562!2d104.89966301136453!3d11.595197200000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109539297965083%3A0x7d11e2074597e98c!2sMett%20Yeung%20Association!5e0!3m2!1sen!2skh!4v1707378900000!5m2!1sen!2skh"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                        />
                        
                        {/* Overlay Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-xs hidden md:block"
                        >
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">Mett Yeung Association</h4>
                                    <p className="text-sm text-gray-500 mt-1">Phnom Penh, Cambodia</p>
                                    <a 
                                        href="https://maps.google.com/maps?ll=11.595197,104.901852&z=17&t=m&hl=en&gl=KH&mapclient=embed&cid=9012019777218636172" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-600 font-medium mt-2 inline-block hover:underline"
                                    >
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
		</section>
	);
}
