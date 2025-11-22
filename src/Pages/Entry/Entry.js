import React, { useEffect, useState } from "react";
import "./Entry.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Host from "../../Host";

const Entry = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state || null; // id = "64abc123..." OR null
  const isEdit = typeof id === "string";

  const [data, setData] = useState({
    type: "",
    name: "",
    company: "",
    phone: "",
    note: "",
    address: "",
    totalAmount: "",
    advance: "",
    restMoney: "",
    gstIncluded: false,
    hasDelivery: true,
    deliveryCharge: "",
    linkedSellId: "",
  });

  const [sellOptions, setSellOptions] = useState([]);
  const [message, setMessage] = useState("");

  // ---------------- FETCH SELL OPTIONS ----------------
  const loadSellOptions = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${Host}/entry/get-sell`, {
      headers: { "auth-token": token },
    });

    const data = await res.json();
    if (data.success) setSellOptions(data.sells);
  };

  // ---------------- FETCH ENTRY DATA WHEN EDITING ----------------
  const loadEntry = async () => {
    if (!isEdit) return;
    const token = localStorage.getItem("token");

    const res = await fetch(`${Host}/entry/${id}`, {
      headers: { "auth-token": token },
    });

    const entryData = await res.json();

    if (entryData.success) {
      setData({
        type: entryData.entry.type,
        name: entryData.entry.name || "",
        company: entryData.entry.company || "",
        phone: entryData.entry.phone || "",
        note: entryData.entry.note || "",
        address: entryData.entry.address || "",
        totalAmount: entryData.entry.totalAmount || "",
        advance: entryData.entry.advance || "",
        restMoney: entryData.entry.restMoney || "",
        gstIncluded: entryData.entry.gstIncluded || false,
        hasDelivery: entryData.entry.hasDelivery || false,
        deliveryCharge: entryData.entry.deliveryCharge || "",
        linkedSellId: entryData.entry.linkedSellId || "",
      });
    } else {
      alert("Entry not found");
      navigate("/");
    }
  };

  // load sell entries from localStorage on mount and whenever storage changes
  useEffect(() => {
    loadSellOptions();
    loadEntry();
  }, []);

  // helper: update a single field
  const upd = (field, value) => setData((d) => ({ ...d, [field]: value }));

  // validate phone simple
  const validPhone = (p) => {
    if (!p) return true;
    const s = String(p).trim();
    return /^[0-9]{7,15}$/.test(s); // allow 7-15 digits
  };

  // ---------------- SUBMIT (ADD / EDIT) ----------------
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    // Basic validations
    if (!data.totalAmount || Number(data.totalAmount) <= 0) {
      return setMessage("Enter a valid total amount.");
    }
    if (data.type === "purchase" && !data.linkedSellId) {
      return setMessage("Purchase must link to a Sell entry.");
    }
    if (data.type === "restMoney" && !data.linkedSellId) {
      return setMessage("Rest Money must link to a Sell entry.");
    }

    const payload = {
      ...data,
      totalAmount: Number(data.totalAmount),
      advance: Number(data.advance || 0),
      restMoney: Number(data.restMoney || 0),
      deliveryCharge: data.hasDelivery ? Number(data.deliveryCharge || 0) : 0,
    };
    // REMOVE linkedSellId IF NOT NEEDED
    if (data.type !== "purchase" && data.type !== "restMoney") {
      delete payload.linkedSellId;
    }

    let url = "";
    let method = "";

    if (!isEdit) {
      url = `${Host}/entry/add`;
      method = "POST";
    } else {
      url = `${Host}/entry/edit/${id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      setMessage("Saved Successfully!");
      setTimeout(() => navigate("/"), 1200);
    } else {
      setMessage(result.error || "Something went wrong");
    }
  };

  return (
    <div className="entry-modal-overlay">
      <div className="entry-modal">
        <h3>{isEdit ? "Edit Entry" : "Add Entry"}</h3>
        {!isEdit && (
          <div className="box">
            <label>Type</label>
            <select
              value={data.type}
              onChange={(e) => upd("type", e.target.value)}
            >
              <option value="">Select type of Entry</option>
              <option value="sell">Sell</option>
              <option value="purchase">Purchase</option>
              {/* <option value="others">Others</option> */}
              <option value="expense">Expense</option>
            </select>
          </div>
        )}
        {data.type !== "restMoney" && (
          <>
            {/* PURCHASE + REST MONEY → SHOW LINKED SELL */}
            {(data.type === "purchase" || data.type === "restMoney") && (
              <div className="box">
                <label>Link to Sell Entry</label>
                <select
                  value={data.linkedSellId}
                  onChange={(e) => upd("linkedSellId", e.target.value)}
                >
                  <option value="">-- select sell entry --</option>
                  {sellOptions.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name} — {s.company} — ₹{s.totalAmount}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        {data.type !== "expense" && (
          <>
            <div className="box">
              <label>Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => upd("name", e.target.value)}
                placeholder="Customer / Supplier name"
              />
            </div>

            <div className="box">
              <label>Company name</label>
              <input
                type="text"
                value={data.company}
                onChange={(e) => upd("company", e.target.value)}
                placeholder="Company / Shop name (optional)"
              />
            </div>
          </>
        )}

        {data.type !== "restMoney" && (
          <>
            {data.type !== "expense" && (
              <>
                <div className="box">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => upd("phone", e.target.value)}
                    placeholder="Phone number"
                  />
                </div>

                <div className="box">
                  <label>Address</label>
                  <input
                    type="text"
                    value={data.address}
                    onChange={(e) => upd("address", e.target.value)}
                    placeholder="Address (optional)"
                  />
                </div>
              </>
            )}

            <div className="box">
              <label>Note</label>
              <input
                type="text"
                value={data.note}
                onChange={(e) => upd("note", e.target.value)}
                placeholder="Short note / description"
              />
            </div>
          </>
        )}

        {data.type === "sell" ? (
          <div className="flex-box">
            <div className="box-small">
              <label>Total amount</label>
              <input
                type="number"
                value={data.totalAmount}
                onChange={(e) => upd("totalAmount", e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>

            <div className="box-small">
              <label>Advance</label>
              <input
                type="number"
                value={data.advance}
                onChange={(e) => upd("advance", e.target.value)}
                placeholder="0"
                min="0"
              />
            </div>
          </div>
        ) : (
          <div className="box">
            <label>Total amount</label>
            <input
              type="number"
              value={data.totalAmount}
              onChange={(e) => upd("totalAmount", e.target.value)}
              placeholder="0"
              min="0"
            />
          </div>
        )}
        {data.type === "restMoney" && (
          <div className="box">
            <label>Rest Money</label>
            <input
              type="number"
              value={data.restMoney}
              onChange={(e) => upd("restMoney", e.target.value)}
            />
          </div>
        )}

        <div className="box-inline">
          {data.type !== "restMoney" && (
            <label>
              <input
                type="checkbox"
                checked={data.gstIncluded}
                onChange={(e) => upd("gstIncluded", e.target.checked)}
              />{" "}
              GST included?
            </label>
          )}

          {/* {(data.type === "sell" || data.type === "purchase") && (
            <label style={{ marginLeft: 12 }}>
              <input
                type="checkbox"
                checked={data.hasDelivery}
                onChange={(e) => upd("hasDelivery", e.target.checked)}
              />{" "}
              Delivery charge?
            </label>
          )} */}
        </div>

        {/* {data.hasDelivery && (
          <div className="box">
            <label>Delivery charge</label>
            <input
              type="number"
              value={data.deliveryCharge}
              onChange={(e) => upd("deliveryCharge", e.target.value)}
              placeholder="Delivery charge"
              min="0"
            />
          </div>
        )} */}

        <div className="modal-buttons">
          <button className="btn-primary" onClick={handleSubmit}>
            Save Entry
          </button>
        </div>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
};

export default Entry;
