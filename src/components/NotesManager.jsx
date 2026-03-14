import React, { useState } from "react";
import { Modal, Button, Form, ListGroup, Spinner } from "react-bootstrap";
import { AddNotesService } from "../services/admin.services";
import { toast } from "react-toastify";

export default function NotesManager({
  show,
  onClose,
  paymentId,
  data,
  type,
  isRejectOpen,
}) {
  const [newNote, setNewNote] = useState("");
  const [newDate, setNewDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Add new note
  const handleAddNote = async () => {
    if (!newNote) {
      toast.error("Please enter a note");
      return;
    }

    const noteData = {
      paymentId,
      note: newNote,
      date: newDate || new Date().toISOString().slice(0, 10),
      type, // or "ALL"
    };

    setLoading(true);
    AddNotesService(noteData)
      .then((res) => {
        toast.success(res?.message);
        onClose();
        setNewNote("");
        setNewDate("");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Error adding note");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* Notes List */}
      <h6 className="mb-3">Previous Notes</h6>
      {!data || data?.length === 0 ? (
        <p className="text-muted">No notes yet</p>
      ) : (
        <ListGroup
          className="mb-4"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {data.map((note, idx) => (
            <ListGroup.Item
              key={idx}
              className="d-flex justify-content-between"
            >
              <div>
                <strong>{note.note}</strong>
                <div className="text-muted small">{note.date}</div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {!isRejectOpen && (
        <>
          <h6 className="mb-2">Add New Note</h6>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleAddNote} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Add Note"}
          </Button>
        </>
      )}
    </>
  );
}
