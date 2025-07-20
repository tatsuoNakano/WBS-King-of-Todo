import React from "react"
import Layout from "../components/Common/Layout"
import { Container } from "react-bootstrap"

const PrivacyPolicy: React.FC = () => {
    return (
        <Layout>
            <Container className="py-5 text-light">
                <h1 className="mb-4">Privacy Policy</h1>

                <p>
                    <strong>WBS King of Todo</strong> (hereinafter referred to as "this software") is distributed as open-source software (OSS) under the MIT License and is completely free to use.
                </p>

                <h4 className="mt-4">1. Analytics & Tracking</h4>
                <p>
                    This software does not use Google Analytics, Mixpanel, or any other analytics or tracking tools.
                    There are no mechanisms implemented to collect or transmit user actions, environment data, or personal information.
                </p>

                <h4 className="mt-4">2. Handling of Personal Information</h4>
                <p>
                    This software does not acquire any personal information from users during installation or use.
                </p>

                <h4 className="mt-4">3. Support</h4>
                <p>
                    This software is provided by an individual developer and does not come with official support.
                    There is no guarantee of functionality or bug fixes.
                </p>
                <p>
                    If you require paid customization or support, feel free to contact us for further discussion.
                </p>


                <h4 className="mt-4">4. Feature Requests</h4>
                <p>
                    If you have any feature requests or feedback regarding this software, please contact us via the "Contact Form" within the app.
                    We will consider them as reference for future development as much as possible.
                </p>

                <h4 className="mt-4">5. Disclaimer</h4>
                <p>
                    The developer assumes no responsibility for any damages arising from the use of this software.
                    All users must use this software at their own risk.
                </p>

                <p className="mt-5 text-end">Last updated: July 13, 2025</p>
            </Container>
        </Layout>
    )
}

export default PrivacyPolicy
