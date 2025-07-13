import React from "react"
import Layout from "../components/Common/Layout"
import { Container, Button, Card } from "react-bootstrap"

const ContactForm: React.FC = () => {
    return (
        <Layout title="お問い合わせ">
            <Container className="py-5 text-light">
                <h1 className="mb-4">お問い合わせ</h1>

                <Card bg="dark" text="light" className="mb-4">
                    <Card.Body>
                        <Card.Text>
                            DevKitBase に関するご要望・バグ報告・感想・お仕事のご依頼などがありましたら、
                            下記の Google フォームよりお知らせください。
                            <br />
                            ※ 無償でのサポート対応は行っておりませんが、
                            <strong>有償での個別対応・機能追加のご相談は可能です。</strong>
                            <br />
                            内容に応じて、対応可否をご連絡させていただきます。
                        </Card.Text>
                        <div className="mt-3">
                            <Button
                                variant="outline-light"
                                href="https://forms.gle/N4SaAYKm88sAiRPGA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="bi bi-box-arrow-up-right me-2" />
                                Googleフォームで問い合わせる
                            </Button>
                        </div>
                    </Card.Body>
                </Card>

                <p className="text-muted small">
                    お送りいただいた内容は、Googleフォーム経由で記録され、個別の返信は原則行っておりません。
                    ご理解のほどよろしくお願いいたします。
                </p>
            </Container>
        </Layout>
    )
}

export default ContactForm
