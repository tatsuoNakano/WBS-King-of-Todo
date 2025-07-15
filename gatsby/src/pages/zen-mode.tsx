import React, { useState, useCallback, useRef, useEffect } from "react";
import { Container, Tabs, Tab, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, ISourceOptions } from "tsparticles-engine";
import * as THREE from "three";
import { Link } from "gatsby";
import * as VANTA from "../utils/vanta";

const particleConfigs: Record<string, ISourceOptions> = {
    fireflies: {
        background: { color: { value: "#000000" } },
        particles: {
            number: { value: 80 },
            color: { value: "#ffff99" },
            size: { value: 4 },
            move: { enable: true, speed: 0.3, random: true },
            opacity: {
                value: 0.8,
                random: true,
                anim: { enable: true, speed: 0.5, opacity_min: 0.3, sync: false },
            },
            shadow: {
                enable: true,
                color: "#ffff99",
                blur: 5,
            },
        },
    },
};

const vantaOptions: Record<string, any> = {
    clouds2: VANTA.CLOUDS2,
    net: VANTA.NET,
    rings: VANTA.RINGS,
    halo: VANTA.HALO,
};

const ZenParticles: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string>("fireflies");
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    const isVanta = activeKey in vantaOptions;

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    // ✅ SSR安全に window.THREE を設定
    useEffect(() => {
        if (typeof window !== "undefined" && !(window as any).THREE) {
            (window as any).THREE = THREE;
        }
    }, []);

    useEffect(() => {
        if (!vantaRef.current) return;

        if (vantaEffect.current) {
            try {
                vantaEffect.current.destroy();
            } catch (e) {
                console.warn("Vanta destroy error", e);
            }
            vantaEffect.current = null;
        }

        if (isVanta) {
            try {
                vantaEffect.current = vantaOptions[activeKey]({
                    el: vantaRef.current,
                    THREE,
                    mouseControls: true,
                    touchControls: true,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                });
            } catch (e) {
                console.error(`Vanta effect '${activeKey}' failed to initialize`, e);
            }
        }

        return () => {
            if (vantaEffect.current) {
                try {
                    vantaEffect.current.destroy();
                } catch (e) {
                    console.warn("Cleanup destroy error", e);
                }
                vantaEffect.current = null;
            }
        };
    }, [activeKey]);

    return (
        <Container
            fluid
            className="bg-dark text-light p-0"
            style={{ height: "100vh", position: "relative" }}
        >
            <div
                ref={vantaRef}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            >
                {!isVanta && (
                    <Particles
                        id="tsparticles"
                        init={particlesInit}
                        options={particleConfigs[activeKey]}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 0,
                        }}
                    />
                )}
            </div>

            <div style={{ position: "relative", zIndex: 1 }} className="p-4">
                <Link className={"btn btn-outline-light"} to={"/"}>
                    Zen-mode Exit
                </Link>
            </div>

            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    zIndex: 2,
                }}
                className="text-light"
            >
                <Tabs
                    activeKey={activeKey}
                    onSelect={(k) => setActiveKey(k || "fireflies")}
                    className="justify-content-center "
                >
                    <Tab eventKey="fireflies" title="ホタル" />
                    <Tab eventKey="clouds2" title="Clouds2" />
                    <Tab eventKey="net" title="Net" />
                    <Tab eventKey="rings" title="Rings" />
                    <Tab eventKey="halo" title="Halo" />
                </Tabs>
            </div>
        </Container>
    );
};

export default ZenParticles;
