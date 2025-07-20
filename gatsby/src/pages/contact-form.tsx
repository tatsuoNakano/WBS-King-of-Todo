import React from "react"
import Layout from "../components/Common/Layout"
import { Container, Button, Card } from "react-bootstrap"

const ContactForm: React.FC = () => {
    return (
        <Layout title="Contact">
            <Container className="py-5 text-light">
                <h1 className="mb-4">Contact</h1>

                <Card bg="dark" text="light" className="mb-4">
                    <Card.Body>
                        <Card.Text>
                            If you have any requests, bug reports, feedback, or business inquiries regarding <strong>DevKitBase</strong>,
                            please contact us via the Google Form linked below.
                            <br />
                            <strong>
                                While we do not offer free support, paid customization and feature development can be discussed.
                            </strong>
                            <br />
                            We will respond based on feasibility and the nature of your request.
                        </Card.Text>
                        <div className="mt-3">
                            <Button
                                variant="outline-light"
                                href="https://forms.gle/xkuiWPjaW1JdnfbFA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-box-arrow-up-right me-2" />
                                Contact via Google Form
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                <p className="text-muted small">
                    Please note that responses are not guaranteed.
                    Submitted information will be stored via Google Forms.
                </p>
            </Container>
        </Layout>
    )
}

export default ContactForm
