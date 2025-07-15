import React, { useState, useEffect } from "react";
import { Button, Form, Container, Dropdown } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import Sortable from "sortablejs";
import Layout from "../components/Common/Layout";

// Electron対応
const isElectron = typeof window !== "undefined" && window.require;
const shell = isElectron ? window.require("electron").shell : null;

interface WebHopperLink {
    title: string;
    url: string;
}

interface WebHopperTemplate {
    id: string;
    name: string;
    links: WebHopperLink[];
}

const STORAGE_KEY = "webhopper_templates";

const WebHopper: React.FC = () => {
    const [templates, setTemplates] = useState<WebHopperTemplate[]>([]);
    const [currentTemplateId, setCurrentTemplateId] = useState<string>("");
    const [newTitle, setNewTitle] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [newTemplateName, setNewTemplateName] = useState("");

    const currentTemplate = templates.find(t => t.id === currentTemplateId);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setTemplates(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    }, [templates]);

    useEffect(() => {
        const el = document.getElementById("sortable-list");
        if (el && currentTemplate) {
            Sortable.create(el, {
                animation: 150,
                onEnd: (evt) => {
                    const newLinks = [...currentTemplate.links];
                    const [movedItem] = newLinks.splice(evt.oldIndex!, 1);
                    newLinks.splice(evt.newIndex!, 0, movedItem);
                    updateTemplateLinks(currentTemplate.id, newLinks);
                },
            });
        }
    }, [currentTemplate]);

    const updateTemplateLinks = (id: string, links: WebHopperLink[]) => {
        setTemplates(prev =>
            prev.map(t => (t.id === id ? { ...t, links } : t))
        );
    };

    const addTemplate = () => {
        if (!newTemplateName.trim()) return;
        const newTemplate: WebHopperTemplate = {
            id: uuidv4(),
            name: newTemplateName.trim(),
            links: [],
        };
        setTemplates([...templates, newTemplate]);
        setCurrentTemplateId(newTemplate.id);
        setNewTemplateName("");
    };

    const deleteTemplate = () => {
        if (!currentTemplateId) return;
        setTemplates(prev => prev.filter(t => t.id !== currentTemplateId));
        setCurrentTemplateId("");
    };

    const renameTemplate = () => {
        const name = prompt("新しいテンプレート名を入力", currentTemplate?.name || "");
        if (!name || !currentTemplateId) return;
        setTemplates(prev =>
            prev.map(t =>
                t.id === currentTemplateId ? { ...t, name } : t
            )
        );
    };

    const addLink = () => {
        if (!currentTemplate) return;

        if (!newTitle.trim() || !newUrl.trim()) {
            alert("タイトルとURLは両方必要です");
            return;
        }

        try {
            const url = new URL(newUrl.trim()); // URL形式チェック
            const updated = [...currentTemplate.links, { title: newTitle.trim(), url: url.toString() }];
            updateTemplateLinks(currentTemplate.id, updated);
            setNewTitle("");
            setNewUrl("");
        } catch {
            alert("正しいURLを入力してください");
        }
    };

    const editLink = (index: number) => {
        const link = currentTemplate?.links[index];
        if (!link) return;
        const title = prompt("タイトルを編集", link.title);
        const url = prompt("URLを編集", link.url);
        if (!title || !url) return;
        const updated = [...(currentTemplate?.links || [])];
        updated[index] = { title, url };
        updateTemplateLinks(currentTemplate!.id, updated);
    };

    const deleteLink = (index: number) => {
        if (!currentTemplate) return;
        const updated = [...currentTemplate.links];
        updated.splice(index, 1);
        updateTemplateLinks(currentTemplate.id, updated);
    };


    return (
        <Layout>
            <Container className="py-4 bg-dark text-light rounded">

                <Form className="mb-3 d-flex gap-2">
                    <Form.Control
                        className="bg-secondary text-light border-0"
                        value={newTemplateName}
                        onChange={e => setNewTemplateName(e.target.value)}
                        placeholder="テンプレート名"
                    />
                    <Button variant="outline-light" onClick={addTemplate}>＋ テンプレート</Button>
                </Form>

                <Dropdown className="mb-3">
                    <Dropdown.Toggle variant="outline-light">
                        {currentTemplate?.name || "テンプレートを選択"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark text-light border border-light">
                        {templates.map(t => (
                            <Dropdown.Item
                                key={t.id}
                                onClick={() => setCurrentTemplateId(t.id)}
                                className="text-light bg-dark"
                            >
                                {t.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>

                {currentTemplate && (
                    <>
                        <div className="mb-3 d-flex gap-2 flex-wrap">
                            <Button variant="outline-light" onClick={renameTemplate}>名前変更</Button>
                            <Button variant="outline-danger" onClick={deleteTemplate}>削除</Button>
                        </div>

                        <Form className="mb-4 d-flex gap-2 flex-wrap">
                            <Form.Control
                                className="bg-secondary text-light border-0"
                                value={newTitle}
                                onChange={e => setNewTitle(e.target.value)}
                                placeholder="リンクタイトル"
                            />
                            <Form.Control
                                className="bg-secondary text-light border-0"
                                value={newUrl}
                                onChange={e => setNewUrl(e.target.value)}
                                placeholder="URL"
                            />
                            <Button variant="outline-light" onClick={addLink}>＋ リンク追加</Button>
                        </Form>

                        <ul id="sortable-list" className="list-group">
                            {currentTemplate.links.map((link, index) => {
                                if (!link?.url || !link?.title) return null;

                                return (
                                    <li
                                        key={index}
                                        className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light border-light"
                                    >
                                        <div>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-info text-decoration-underline fs-4"
                                            >
                                                {link.title}
                                            </a>
                                            <br />
                                            <small className="text-muted">{link.url}</small>
                                        </div>
                                        <div className="btn-group">
                                            <Button variant="outline-light"  onClick={() => editLink(index)}>編集</Button>
                                            <Button variant="outline-danger"  onClick={() => deleteLink(index)}>削除</Button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </Container>
        </Layout>
    );
};

export default WebHopper;
