"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Chatbot.module.css";

// Predefined quick questions
const MAIN_OPTIONS = [
  { text: "📦 Track Cargo Status", id: "track_cargo" },
  { text: "📊 Request Shipping Quote", id: "request_quote" },
  { text: "🌐 Gateways & Offices", id: "locations" },
  { text: "🛡️ Customs & Compliance", id: "customs" },
  { text: "📞 Contact HQ Desk", id: "contact_hq" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Guided quote collector state
  const [quoteFlow, setQuoteFlow] = useState({
    active: false,
    step: 0, // 1: Origin, 2: Destination, 3: Service, 4: Details, 5: Contact
    origin: "",
    destination: "",
    service: "",
    details: "",
    contact: "",
  });

  // Shipment tracking state
  const [trackingFlow, setTrackingFlow] = useState({
    active: false,
  });

  const chatEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([
      {
        id: "msg-1",
        sender: "bot",
        text: "Welcome to Hasoon Logistics. I am your AI Cargo Advisor. How may I assist your supply chain operations today?",
        options: MAIN_OPTIONS,
      },
    ]);
  }, []);

  // Scroll to bottom when messages or typing status updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Utility to dispatch message with typing simulation
  const simulateBotResponse = (text, options = null, trackingInfo = null) => {
    setIsTyping(true);
    const delay = Math.min(600 + text.length * 5, 1200); // Dynamic reading delay

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: "bot",
          text,
          options,
          trackingInfo,
        },
      ]);
    }, delay);
  };

  // Helper to handle form filling automation
  const handleAutoFillForm = (data) => {
    // Look up elements
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const phoneInput = document.getElementById("contact-phone");
    const serviceSelect = document.getElementById("contact-service");
    const messageInput = document.getElementById("contact-message");

    if (!nameInput && !emailInput && !phoneInput && !serviceSelect && !messageInput) {
      return false; // Contact form elements not found on the active page
    }

    // Split user coordinate string "Aseem Aslah, aseem@company.com, +971501234567"
    const coords = data.contact || "";
    let name = "";
    let email = "";
    let phone = "";

    const parts = coords.split(",").map((p) => p.trim());
    if (parts.length >= 1) name = parts[0];
    if (parts.length >= 2) {
      if (parts[1].includes("@")) {
        email = parts[1];
      } else {
        phone = parts[1];
      }
    }
    if (parts.length >= 3) {
      if (parts[2].includes("@")) {
        email = parts[2];
        phone = parts[1];
      } else {
        phone = parts[2];
        email = parts[1];
      }
    }

    // React programmatic input setter utility
    const setReactValue = (el, val, eventType = "input") => {
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(el),
        "value"
      )?.set;
      if (setter) {
        setter.call(el, val);
        el.dispatchEvent(new Event(eventType, { bubbles: true }));
      } else {
        el.value = val;
      }
    };

    if (name) setReactValue(nameInput, name);
    if (email) setReactValue(emailInput, email);
    if (phone) setReactValue(phoneInput, phone);

    // Map service options
    let serviceValue = "";
    const svc = (data.service || "").toLowerCase();
    if (svc.includes("air")) serviceValue = "air";
    else if (svc.includes("sea") || svc.includes("ocean")) serviceValue = "sea";
    else if (svc.includes("land") || svc.includes("road") || svc.includes("truck")) serviceValue = "land";
    else if (svc.includes("warehous") || svc.includes("cold") || svc.includes("storage")) serviceValue = "warehousing";

    if (serviceValue) {
      setReactValue(serviceSelect, serviceValue, "change");
    }

    // Assemble specific message requirement notes
    const messageContent = `Automated Quote Request via Hasoon AI Advisor:
- Origin: ${data.origin}
- Destination: ${data.destination}
- Transportation Mode: ${data.service}
- Shipment Requirements: ${data.details}
- Client Coordinates: ${coords}`;

    setReactValue(messageInput, messageContent);

    // Highlight and scroll the form section into viewport
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }

    return true;
  };

  // Generate tracking details from mock tracker logic
  const handleTrackingQuery = (trackId) => {
    const code = trackId.toUpperCase().trim();
    const stages = [
      { name: "Cargo Sourced", desc: "Goods consolidated at sorting terminal", status: "completed" },
      { name: "Customs Cleared", desc: "Export customs clearing executed", status: "completed" },
      { name: "Ocean/Overland Transit", desc: "Vessel in intercontinental shipping lane", status: "completed" },
      { name: "Inbound Port Customs", desc: "JAFZA/FASAH clearance review", status: "active" },
      { name: "Warehouse Delivered", desc: "Secured in GDP Cold Warehousing", status: "pending" },
    ];

    let locationInfo = "China to Dubai Route";
    let eta = "3 Days";
    let carrier = "Vessel Cosco Arcs (Voyage 40B)";

    if (code.includes("IND") || code.charCodeAt(0) % 2 === 0) {
      locationInfo = "Mumbai (JNPT) to Riyadh (Olaya) Corridor";
      stages[0].desc = "Consolidation complete in Mumbai";
      stages[1].desc = "India Customs export file cleared";
      stages[2].desc = "Sea transit Mumbai to Jebel Ali Port";
      stages[3].desc = "Overland linehaul transiting UAE-Saudi border";
      carrier = "Linehaul Trailer TR-994";
      eta = "2 Days";
    } else if (code.includes("KSA") || code.charCodeAt(1) % 3 === 0) {
      locationInfo = "Dubai (JAFZA) to Saudi (Riyadh) Gateway";
      stages[0].desc = "Dispatched from Jebel Ali GDP vault";
      stages[1].desc = "SABER / FASAH compliance clearance approved";
      stages[2].desc = "GCC cross-border linehaul fleet dispatch";
      stages[3].desc = "Arrived at Riyadh customs dry-port";
      stages[3].status = "active";
      stages[4].desc = "Delivery scheduled to Olaya Warehouse";
      carrier = "Secure fleet Box Truck H-08";
      eta = "8 Hours";
    }

    return {
      stages,
      locationInfo,
      eta,
      carrier,
      id: code,
    };
  };

  // Guided quote flow processor
  const handleQuoteFlow = (text) => {
    const nextStep = quoteFlow.step + 1;

    if (quoteFlow.step === 0) {
      setQuoteFlow((prev) => ({ ...prev, active: true, step: 1 }));
      simulateBotResponse("Which country is your cargo shipping FROM?\n(e.g., China, India, UAE, Saudi Arabia)", [
        { text: "China", id: "q_from_china" },
        { text: "India", id: "q_from_india" },
        { text: "UAE", id: "q_from_uae" },
        { text: "Saudi Arabia", id: "q_from_saudi" },
      ]);
    } else if (quoteFlow.step === 1) {
      setQuoteFlow((prev) => ({ ...prev, origin: text, step: 2 }));
      simulateBotResponse(`Understood: Origin is ${text}. Now, which country is your cargo shipping TO?`, [
        { text: "UAE", id: "q_to_uae" },
        { text: "Saudi Arabia", id: "q_to_saudi" },
        { text: "India", id: "q_to_india" },
        { text: "China", id: "q_to_china" },
      ]);
    } else if (quoteFlow.step === 2) {
      setQuoteFlow((prev) => ({ ...prev, destination: text, step: 3 }));
      simulateBotResponse("Which primary transportation service is required?", [
        { text: "✈️ Priority Air Cargo", id: "q_svc_air" },
        { text: "🚢 Ocean Freight", id: "q_svc_ocean" },
        { text: "🚛 Overland Trucking", id: "q_svc_land" },
        { text: "❄️ GDP Cold Warehousing", id: "q_svc_cold" },
      ]);
    } else if (quoteFlow.step === 3) {
      setQuoteFlow((prev) => ({ ...prev, service: text, step: 4 }));
      simulateBotResponse("Please describe your cargo requirements briefly.\n(e.g., Estimated weight/volume, item description, hazardous/fragile status)");
    } else if (quoteFlow.step === 4) {
      setQuoteFlow((prev) => ({ ...prev, details: text, step: 5 }));
      simulateBotResponse("Lastly, please share your details for coordinate contact.\n(Format: Full Name, Business Email, Direct Phone)");
    } else if (quoteFlow.step === 5) {
      const finalData = { ...quoteFlow, contact: text };
      setQuoteFlow({ active: false, step: 0 }); // Reset state

      simulateBotResponse("Processing your shipping quote request secure audit...");

      setTimeout(() => {
        const isPopulated = handleAutoFillForm(finalData);

        let confirmationMsg = `Quote request #HS-Q-${Math.floor(1000 + Math.random() * 9000)} generated successfully!\n\n` +
          `• Origin: ${finalData.origin}\n` +
          `• Destination: ${finalData.destination}\n` +
          `• Service: ${finalData.service}\n` +
          `• Cargo: ${finalData.details}\n` +
          `• Contact: ${text}\n\n`;

        if (isPopulated) {
          confirmationMsg += "⚡ I have auto-populated these parameters directly into the secure Contact Form on the page! Please scroll to the form and hit 'Submit secure request' to submit to the desk.";
        } else {
          confirmationMsg += "Our corporate compliance desk has queued this inquiry and will follow up shortly at your email.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: "bot",
            text: confirmationMsg,
            options: MAIN_OPTIONS,
          },
        ]);
      }, 1000);
    }
  };

  // General message router
  const handleUserMessage = (text) => {
    if (!text.trim()) return;

    // Add user message to log
    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, sender: "user", text },
    ]);
    setInputValue("");

    // If active quote flow
    if (quoteFlow.active) {
      handleQuoteFlow(text);
      return;
    }

    // If active tracking input flow
    if (trackingFlow.active) {
      setTrackingFlow({ active: false });
      const info = handleTrackingQuery(text);
      simulateBotResponse(
        `Shipment ${info.id} trace audit retrieved:`,
        MAIN_OPTIONS,
        info
      );
      return;
    }

    const query = text.toLowerCase();

    // Check query intent matching
    if (query.includes("track") || query.includes("status") || query.includes("where is") || query.match(/hs-\d+/)) {
      const match = text.match(/HS-\d+/i);
      if (match) {
        const info = handleTrackingQuery(match[0]);
        simulateBotResponse(
          `Shipment ${info.id} trace audit retrieved:`,
          MAIN_OPTIONS,
          info
        );
      } else {
        setTrackingFlow({ active: true });
        simulateBotResponse("Please enter your Hasoon Logistics shipment or booking number (e.g. HS-10293 or HS-88419):");
      }
    } else if (query.includes("quote") || query.includes("price") || query.includes("rate") || query.includes("how much") || query.includes("cost")) {
      handleQuoteFlow("");
    } else if (query.includes("location") || query.includes("office") || query.includes("dubai") || query.includes("riyadh") || query.includes("india") || query.includes("china")) {
      simulateBotResponse(
        "Hasoon Logistics operates core gateways in 4 countries:\n\n" +
          "🇦🇪 UAE HQ: Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai. Clearing JAFZA & DAFZA ports.\n" +
          "🇸🇦 Saudi: Olaya District, Riyadh. Processing customs via FASAH & SABER portals.\n" +
          "🇮🇳 India: Mumbai (JNPT Port Clearing office), Mundra, Chennai.\n" +
          "🇨🇳 China: Shanghai, Ningbo, Shenzhen. Export LCL consolidation hubs.\n\n" +
          "Type 'quote' to calculate shipping route rates.",
        MAIN_OPTIONS
      );
    } else if (query.includes("service") || query.includes("air") || query.includes("sea") || query.includes("ocean") || query.includes("road") || query.includes("truck") || query.includes("warehous") || query.includes("cold") || query.includes("customs") || query.includes("clearance")) {
      simulateBotResponse(
        "Our luxury logistics capabilities include:\n\n" +
          "• Priority Air Cargo: 12-36h express transit with secured slot allocation.\n" +
          "• Ocean Freight: Deep sea FCL/LCL consolidation lanes.\n" +
          "• Overland Trucking: GCC cross-border refrigerated and box linehauls.\n" +
          "• Cold Chain: GDP pharmaceutical-grade storage vaults.\n" +
          "• Customs Clearance: Accredited border compliance brokerage via FASAH, SABER, and JAFZA desks.",
        MAIN_OPTIONS
      );
    } else if (query.includes("contact") || query.includes("phone") || query.includes("email") || query.includes("support") || query.includes("whatsapp") || query.includes("desk")) {
      simulateBotResponse(
        "Connect directly with our 24/7 Corporate desk:\n\n" +
          "📞 Priority Phone: +971 50 123 4567\n" +
          "✉️ Business Email: desk@hasoonlogistics.com\n" +
          "📍 Dubai Headquarters: Luxury Trade Tower, Level 44, Sheikh Zayed Road, Dubai, UAE.\n\n" +
          "You can also click the WhatsApp widget floating above me to text us directly.",
        MAIN_OPTIONS
      );
    } else if (query.includes("hello") || query.includes("hi ") || query.includes("hey") || query.includes("menu")) {
      simulateBotResponse(
        "Greetings. I can support cargo quote inquiries, status tracking, compliance checklists, or HQ referrals. Select an option below:",
        MAIN_OPTIONS
      );
    } else {
      simulateBotResponse(
        "I am the Hasoon Logistics Cargo Advisor. I can answer inquiries regarding our shipping corridors, customs clearances, temperature-controlled cold chains, or real-time status details.\n\n" +
          "Select one of our primary tools below to proceed:",
        MAIN_OPTIONS
      );
    }
  };

  // Option pill selector callback
  const handleOptionClick = (optId, optText) => {
    // If it's a quote form option during quote flow
    if (quoteFlow.active) {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: optText },
      ]);
      let cleanedVal = optText;
      if (optId.startsWith("q_svc_")) cleanedVal = optText.replace(/^[^\w]*/, ""); // strip emoji
      handleQuoteFlow(cleanedVal);
      return;
    }

    // Standard initial menu selection
    if (optId === "track_cargo") {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: "Track Cargo" },
      ]);
      setTrackingFlow({ active: true });
      simulateBotResponse("Please enter your Hasoon Logistics cargo tracking or container number (e.g. HS-10293):");
    } else if (optId === "request_quote") {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: "Get Quote" },
      ]);
      handleQuoteFlow("");
    } else if (optId === "locations") {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: "Offices & Gateways" },
      ]);
      handleUserMessage("locations");
    } else if (optId === "customs") {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: "Customs & Compliance" },
      ]);
      simulateBotResponse(
        "Hasoon Logistics is a WCO AEO Certified Operator, facilitating frictionless customs brokerages:\n\n" +
          "• Saudi SABER & FASAH system pre-clearance certificates.\n" +
          "• Dubai JAFZA customs clearance and e-Guarantee returns.\n" +
          "• India Import/Export custom brokerage (JNPT Mumbai, Mundra).\n" +
          "• CEPA tariff optimization consulting for India-UAE corridors.",
        MAIN_OPTIONS
      );
    } else if (optId === "contact_hq") {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: "Contact desk" },
      ]);
      handleUserMessage("contact");
    } else if (optId.startsWith("q_from_")) {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: optText },
      ]);
      handleQuoteFlow(optText);
    } else if (optId.startsWith("q_to_")) {
      setMessages((prev) => [
        ...prev,
        { id: `msg-${Date.now()}`, sender: "user", text: optText },
      ]);
      handleQuoteFlow(optText);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleUserMessage(inputValue);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <div className={styles.clickMeBadge} suppressHydrationWarning>
          Click me!
        </div>
      )}
      <button
        className={styles.chatbotTrigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Cargo Advisor Chat"
        id="chatbot-floating-btn"
        suppressHydrationWarning
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
        )}
      </button>

      {/* Chat Window Panel */}
      <div
        className={`${styles.chatbotWindow} ${
          isOpen ? styles.chatbotWindowActive : ""
        }`}
        id="chatbot-overlay-window"
      >
        {/* Header section */}
        <div className={styles.chatHeader}>
          <div className={styles.headerBrand}>
            <div className={styles.avatar}>HA</div>
            <div className={styles.headerInfo}>
              <h4>Hasoon Advisor</h4>
              <div className={styles.headerStatus}>
                <span className={styles.statusDot} />
                <span>Executive Desk Online</span>
              </div>
            </div>
          </div>
          <button
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close Chat"
            suppressHydrationWarning
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>

        {/* Messaging Box */}
        <div className={styles.chatHistory}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div
                className={`${styles.messageRow} ${
                  msg.sender === "user" ? styles.rowUser : styles.rowBot
                }`}
              >
                <div
                  className={`${styles.bubble} ${
                    msg.sender === "user" ? styles.bubbleUser : styles.bubbleBot
                  }`}
                  style={{ whiteSpace: "pre-line" }}
                >
                  {msg.text}
                </div>
              </div>

              {/* Graphic Shipment Timeline Card */}
              {msg.trackingInfo && (
                <div className={styles.trackingCard}>
                  <div className={styles.trackingHeader}>
                    <span className={styles.trackingNumber}>ID: {msg.trackingInfo.id}</span>
                    <span className={styles.trackingEta}>ETA: {msg.trackingInfo.eta}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.5rem" }}>
                    <strong>Route:</strong> {msg.trackingInfo.locationInfo} <br/>
                    <strong>Carrier:</strong> {msg.trackingInfo.carrier}
                  </div>
                  <div className={styles.trackingSteps}>
                    {msg.trackingInfo.stages.map((stage, idx) => (
                      <div
                        key={idx}
                        className={`${styles.trackingStep} ${
                          stage.status === "completed"
                            ? styles.stepCompleted
                            : stage.status === "active"
                            ? styles.stepActive
                            : ""
                        }`}
                      >
                        <span className={styles.stepDot} />
                        <strong>{stage.name}</strong>
                        <div style={{ fontSize: "0.68rem", color: "#94A3B8" }}>
                          {stage.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action options list */}
              {msg.options && (
                <div className={styles.optionsWrapper}>
                  {msg.options.map((opt) => (
                    <button
                      key={opt.id}
                      className={styles.optionButton}
                      onClick={() => handleOptionClick(opt.id, opt.text)}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Bouncer Bubble */}
          {isTyping && (
            <div className={`${styles.messageRow} ${styles.rowBot}`}>
              <div className={styles.typingBubble}>
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
                <span className={styles.typingDot} />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input panel form */}
        <form className={styles.chatInputForm} onSubmit={handleFormSubmit}>
          <input
            type="text"
            className={styles.chatInputField}
            placeholder={
              quoteFlow.active
                ? "Enter response details..."
                : trackingFlow.active
                ? "e.g. HS-10293..."
                : "Ask about shipping, corridors..."
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            aria-label="Chat input message text"
            suppressHydrationWarning
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send Message"
            suppressHydrationWarning
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
