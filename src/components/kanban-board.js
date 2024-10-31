import React, { useState, useEffect } from "react";
import TicketService from "./../services/ticket.service";

//TODO: move it to enum file
const ENUM_STATUS = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    TicketService.getAllTickets().then((res) => setTickets(res.data.data));
  }, []);

  const handleAddTicket = () => {
    TicketService.createTicket({ title, description }).then((newTicket) => {
      setTickets([...tickets, newTicket.data]);
      setTitle("");
      setDescription("");
    });
  };

  const handleChangeStatus = (ticketId, newStatus, ticket) => {
    console.log('ticket:::::::', ticket)
    const updatedTicket = {
      title: ticket.title,
      description: ticket.description ?? null,
      status: newStatus,
    };
    console.log("updatedTicket::::::::", updatedTicket);
    TicketService.updateTicketStatus(ticketId, updatedTicket).then(() => {
      setTickets(
        tickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Ticket Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAddTicket}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add Ticket
        </button>
      </div>

      <div className="flex space-x-4">
        {Object.values(ENUM_STATUS).map((status) => (
          <div key={status} className="w-1/3 p-2 bg-white shadow rounded">
            <h2 className="text-lg font-semibold text-center">{status}</h2>
            <div>
              {tickets
                .filter((ticket) => ticket.status === status)
                .map((ticket) => (
                  <div
                    key={ticket._id}
                    className="p-2 my-2 bg-gray-200 rounded"
                  >
                    <h3 className="font-bold">{ticket.title}</h3>
                    <p>{ticket.description}</p>
                    <div className="flex space-x-2 mt-2">
                      {status !== ENUM_STATUS.TO_DO && (
                        <button
                          onClick={() =>
                            handleChangeStatus(ticket._id, ENUM_STATUS.TO_DO, ticket)
                          }
                          className="p-1 bg-green-500 text-white rounded"
                        >
                          To Do
                        </button>
                      )}
                      {status !== ENUM_STATUS.IN_PROGRESS && (
                        <button
                          onClick={() =>
                            handleChangeStatus(
                              ticket._id,
                              ENUM_STATUS.IN_PROGRESS,
                              ticket
                            )
                          }
                          className="p-1 bg-yellow-500 text-white rounded"
                        >
                          In Progress
                        </button>
                      )}
                      {status !== ENUM_STATUS.DONE && (
                        <button
                          onClick={() =>
                            handleChangeStatus(ticket._id, ENUM_STATUS.DONE, ticket)
                          }
                          className="p-1 bg-red-500 text-white rounded"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default KanbanBoard;
