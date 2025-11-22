import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/AppContext";
import Card from "../../Components/Card/Card";

const History = () => {
  const { entries, getAllEntries, adminDetail, getAccountDetails } =
    useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAllEntries();
      getAccountDetails();
    }
  }, [navigate]);

//   console.log(entries, "entries");
  const [search, setSearch] = useState("");
  const [openSell, setOpenSell] = useState(null); // store open SELL id

  // -----------------------------------------
  //  GROUPING
  // -----------------------------------------

  // Show sell, others, expense at top level
  const topLevel = entries.filter((e) =>
    ["sell", "others", "expense"].includes(e.type)
  );

  // Children (purchase + rest) stay same
  const purchases = entries.filter((e) => e.type === "purchase");
  const restMoneys = entries.filter((e) => e.type === "restMoney");
  const deliveries = entries.filter((e) => e.type === "delivery");
  const loggedInUserId = adminDetail._id;

  if (!entries.length) {
    return (
      <div className="Home">
        <div className="Home-main">
          <p>No Transaction Found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="home-search-box">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* GROUPED LIST */}
        <div className="entries-list">
          {topLevel
            .filter((e) =>
              (e.name || "").toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => {
              // PURCHASE entries under SELL only
              const relatedPurchases = purchases.filter(
                (p) => String(p.linkedSellId) === String(item._id)
              );

              const relatedDelivery = deliveries.filter(
                (d) => String(d.linkedSellId) === String(item._id)
              );

              // REST MONEY entries under SELL only
              const relatedRest = restMoneys.filter(
                (r) => String(r.linkedSellId) === String(item._id)
              );

              return (
                <div key={item._id} className="sell-group">
                  {/* Show card for sell, others, expense */}
                  <Card
                    data={item}
                    openSell={openSell}
                    setOpenSell={setOpenSell}
                    purchases={purchases}
                    loggedInUserId={loggedInUserId}
                    getAllEntries={getAllEntries}
                  />

                  {/* Only SELL has children */}
                  {item.type === "sell" && openSell === item._id && (
                    <div className="purchase-list">
                      {relatedPurchases.length > 0 && (
                        <>
                          {relatedPurchases.map((p) => (
                            <Card
                              key={p._id}
                              data={p}
                              isChild={true}
                              loggedInUserId={loggedInUserId}
                              getAllEntries={getAllEntries}
                            />
                          ))}
                        </>
                      )}

                      {relatedRest.length > 0 && (
                        <>
                          {relatedRest.map((r) => (
                            <Card
                              key={r._id}
                              data={r}
                              isChild={true}
                              loggedInUserId={loggedInUserId}
                              getAllEntries={getAllEntries}
                            />
                          ))}
                        </>
                      )}
                      {relatedDelivery.length > 0 && (
                        <>
                          {relatedDelivery.map((d) => (
                            <Card
                              key={d._id}
                              data={d}
                              isChild={true}
                              loggedInUserId={loggedInUserId}
                              getAllEntries={getAllEntries}
                            />
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default History;
