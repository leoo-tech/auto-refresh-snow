javascript:(() => {

    if (window.snMonitorLoaded) {
        console.log("ServiceNow Monitor já carregado.");
        return;
    }

    window.snMonitorLoaded = true;
    window.snMonitorRunning = false;
    window.snMonitorTimer = null;

    let lastAlertState = false;

    const CONFIG = {
        defaultIntervalSeconds: 30,
        originalTitle: document.title,
        monitorTitle: "[MONITOR]",
        incidentTitle: "⚠️ NEW INCIDENT!"
    };

    function getQueueFrame() {

        return window.frames[0];
    }

    function getPageState() {

        const frame = getQueueFrame();

        if (!frame?.document?.body) {
            return null;
        }

        const pageText =
            frame.document.body.innerText.toLowerCase();

        return {
            hasNew: pageText.includes("new"),
            hasEmpty: pageText.includes("empty")
        };
    }

    function notifyNewIncident() {

        document.title =
            `${CONFIG.incidentTitle} ${CONFIG.originalTitle}`;

        if (Notification.permission === "granted") {

            new Notification(
                "ServiceNow Monitor",
                {
                    body: "Novo incidente detectado na fila."
                }
            );
        }

        console.log(
            `[ALERT] Novo incidente detectado às ${new Date().toLocaleTimeString()}`
        );
    }

    function clearIncidentAlert() {

        document.title =
            `${CONFIG.monitorTitle} ${CONFIG.originalTitle}`;
    }

    function refreshQueue() {

        const frame = getQueueFrame();

        if (!frame?.location) {

            console.warn(
                "Queue frame não encontrado."
            );

            return;
        }

        frame.location.reload();
    }

    function checkQueue() {

        const state = getPageState();

        if (!state) {
            return;
        }

        const incidentDetected =
            state.hasNew && state.hasEmpty;

        if (
            incidentDetected &&
            !lastAlertState
        ) {

            notifyNewIncident();

            lastAlertState = true;

        } else if (!incidentDetected) {

            lastAlertState = false;

            clearIncidentAlert();
        }

        console.log(
            `[CHECK] New=${state.hasNew} Empty=${state.hasEmpty} | ${new Date().toLocaleTimeString()}`
        );
    }

    function createMonitorBadge(intervalSeconds) {

        const existing =
            document.getElementById(
                "sn-monitor-badge"
            );

        if (existing) {
            existing.remove();
        }

        const badge =
            document.createElement("div");

        badge.id =
            "sn-monitor-badge";

        badge.innerHTML =
            `🟢 SN Monitor (${intervalSeconds}s)`;

        badge.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 999999;
            background: #107c10;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: Segoe UI;
            font-size: 12px;
            font-weight: bold;
            box-shadow: 0 2px 6px rgba(0,0,0,.3);
        `;

        document.body.appendChild(
            badge
        );
    }

    window.snStopMonitor =
        function () {

            clearInterval(
                window.snMonitorTimer
            );

            window.snMonitorTimer =
                null;

            window.snMonitorRunning =
                false;

            const badge =
                document.getElementById(
                    "sn-monitor-badge"
                );

            if (badge) {
                badge.remove();
            }

            document.title =
                CONFIG.originalTitle;

            console.log(
                "ServiceNow Monitor parado."
            );
        };

    window.snStartMonitor =
        function (
            seconds =
                CONFIG.defaultIntervalSeconds
        ) {

            window.snStopMonitor();

            window.snMonitorRunning =
                true;

            document.title =
                `${CONFIG.monitorTitle} ${CONFIG.originalTitle}`;

            createMonitorBadge(
                seconds
            );

            window.snMonitorTimer =
                setInterval(() => {

                    checkQueue();
                    refreshQueue();

                }, seconds * 1000);

            console.log(
                `ServiceNow Monitor iniciado (${seconds}s).`
            );
        };

    window.snSetInterval =
        function (seconds) {

            if (
                !window.snMonitorRunning
            ) {

                console.warn(
                    "Monitor não está rodando."
                );

                return;
            }

            window.snStartMonitor(
                seconds
            );

            console.log(
                `Intervalo alterado para ${seconds}s.`
            );
        };

    window.snStatus =
        function () {

            console.table({
                loaded:
                    window.snMonitorLoaded,
                running:
                    window.snMonitorRunning,
                timer:
                    !!window.snMonitorTimer
            });
        };

    Notification.requestPermission();

    console.log(
        "ServiceNow Monitor carregado."
    );
	javascript:alert('Funcionou');

	snStartMonitor();

})();