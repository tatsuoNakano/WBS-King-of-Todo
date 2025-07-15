import React from "react"
import Layout from "../components/Common/Layout"
import { Container } from "react-bootstrap"

const PrivacyPolicy: React.FC = () => {
    return (
        <Layout>
            <Container className="py-5 text-light">
                <h1 className="mb-4">プライバシーポリシー</h1>

                <p><strong>DevKitBase</strong>（以下、本ソフトウェア）は、MITライセンスのもとにオープンソースソフトウェア（OSS）として配布されており、完全に無料で利用可能なフリーウェアです。</p>

                <h4 className="mt-4">1. アナリティクス・トラッキングについて</h4>
                <p>
                    本ソフトウェアは、Google Analytics、Mixpanel、その他のトラッキング・アナリティクスツールを一切使用しておりません。
                    ユーザーの操作、環境情報、個人情報を収集・送信する仕組みは組み込まれていません。
                </p>

                <h4 className="mt-4">2. 個人情報の取り扱い</h4>
                <p>
                    本ソフトウェアは、インストールおよび使用にあたってユーザーの個人情報を取得することはありません。
                </p>

                <h4 className="mt-4">3. サポートについて</h4>
                <p>
                    本ソフトウェアは、個人開発者によって提供されているものであり、公式なサポート対応は行っておりません。
                    動作保証やバグ修正に関しても、必ずしも対応をお約束するものではありません。
                </p>

                <h4 className="mt-4">4. 機能追加のご要望</h4>
                <p>
                    本ソフトウェアに対する機能追加のご要望やフィードバックがございましたら、アプリ内の「問い合わせフォーム」よりお知らせください。
                    可能な範囲で、今後の開発の参考とさせていただきます。
                </p>

                <h4 className="mt-4">5. 免責事項</h4>
                <p>
                    本ソフトウェアの使用により生じたいかなる損害についても、開発者は一切の責任を負いません。
                    すべてのユーザーは自己責任において本ソフトウェアをご利用ください。
                </p>

                <p className="mt-5 text-end">最終更新日：2025年7月13日</p>
            </Container>
        </Layout>
    )
}

export default PrivacyPolicy
