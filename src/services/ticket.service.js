import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/kanban";

class TicketService {
  getAllTickets(page, limit) {
    return axios.get(`${API_URL}?page=${page ?? 1}&limt=${limit ?? 10}`);
  }

  createTicket(ticket) {
    return axios.post(API_URL, ticket);
  }

  updateTicketStatus(id, ticket) {
    const { title, description, status } = ticket;
    return axios.put(`${API_URL}/${id}`, { title, description, status });
  }
}

export default new TicketService();
