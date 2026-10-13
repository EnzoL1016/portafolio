(function () {
  // `projects` is loaded first by index.html as a classic script.
  const $ = (selector) => document.querySelector(selector);
  const projectButtons = [...document.querySelectorAll("[data-project]")];
  const stage = $("#project-map");
  const mapCaption = $("#map-caption");
  const mapLines = stage?.querySelector(".map-lines");
  const mapEdges = mapLines?.querySelector(".map-edges");
  const componentHeading = $("#component-heading");
  const componentCopy = $("#component-copy");
  const mobileLayout = window.matchMedia("(max-width: 600px)");
  let activeProject = "pelotita";
  let activeComponent = "players";
  let frame = 0;

  function scheduleEdges() {
    if (!stage || !mapLines || !mapEdges || frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      drawEdges();
    });
  }

  function renderComponent() {
    const project = projects[activeProject];
    const node = project?.graph.nodes.find((item) => item.id === activeComponent);
    if (!node) return;
    if (componentHeading) componentHeading.textContent = `${node.title} · ${node.subtitle}`;
    if (componentCopy) componentCopy.textContent = node.detail;
    stage?.querySelectorAll("[data-component]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.component === activeComponent));
    });
  }

  function makeNode(node) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-node";
    button.dataset.component = node.id;
    button.setAttribute("aria-pressed", "false");
    const [column, row] = mobileLayout.matches ? node.mobilePosition : node.position;
    button.style.gridColumn = String(column);
    button.style.gridRow = String(row);

    const title = document.createElement("span");
    title.className = "node-title";
    title.textContent = node.title;
    const subtitle = document.createElement("span");
    subtitle.className = "node-sub";
    subtitle.textContent = node.subtitle;
    button.append(title, subtitle);
    button.addEventListener("click", () => {
      activeComponent = node.id;
      renderComponent();
    });
    return button;
  }

  function renderMap(project) {
    if (!stage) return;
    activeComponent = project.graph.nodes[0].id;
    if (mapCaption) mapCaption.textContent = project.graph.caption;
    stage.querySelectorAll(".map-node").forEach((node) => node.remove());
    project.graph.nodes.forEach((node) => stage.append(makeNode(node)));
    renderComponent();
    scheduleEdges();
  }

  function renderProject(key) {
    const project = projects[key];
    if (!project) return;
    activeProject = key;
    $("#project-kicker").textContent = project.kicker;
    $("#project-title").textContent = project.title;
    $("#project-status").textContent = project.status;
    $(".status-chip").classList.toggle("is-mvp", project.status.startsWith("MVP"));
    $("#project-announcement").textContent = `${project.title}: proyecto seleccionado.`;
    $("#project-summary").textContent = project.summary;
    $("#project-problem").textContent = project.problem;
    $("#project-solution").textContent = project.solution;
    $("#project-stack").textContent = project.stack;
    $("#project-demo").href = project.demo;
    $("#project-source").href = project.source;
    $("#project-demo").textContent = `${project.demoLabel || "Abrir demo"} ↗`;
    $("#project-source").textContent = `${project.sourceLabel || "Fuente"} ↗`;
    $("#map-id").textContent = project.map;
    projectButtons.forEach((button) => {
      const selected = button.dataset.project === key;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    renderMap(project);
  }

  function pointFor(nodeRect, stageRect, side) {
    const left = nodeRect.left - stageRect.left;
    const right = nodeRect.right - stageRect.left;
    const top = nodeRect.top - stageRect.top;
    const bottom = nodeRect.bottom - stageRect.top;
    const centerX = (left + right) / 2;
    const centerY = (top + bottom) / 2;
    if (side === "left") return { x: left, y: centerY };
    if (side === "right") return { x: right, y: centerY };
    if (side === "top") return { x: centerX, y: top };
    return { x: centerX, y: bottom };
  }

  function drawEdges() {
    const project = projects[activeProject];
    const stageRect = stage.getBoundingClientRect();
    const width = stageRect.width;
    const height = stageRect.height;
    if (width <= 0 || height <= 0) return;
    mapLines.setAttribute("viewBox", `0 0 ${width} ${height}`);
    mapLines.setAttribute("width", String(width));
    mapLines.setAttribute("height", String(height));
    mapEdges.replaceChildren();

    for (const edge of project.graph.edges) {
      const source = stage.querySelector(`[data-component="${edge.from}"]`);
      const target = stage.querySelector(`[data-component="${edge.to}"]`);
      if (!source || !target) continue;
      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (!sourceRect.width || !sourceRect.height || !targetRect.width || !targetRect.height) continue;
      const sourceCol = mobileLayout.matches
        ? project.graph.nodes.find((node) => node.id === edge.from).mobilePosition[0]
        : project.graph.nodes.find((node) => node.id === edge.from).position[0];
      const targetCol = mobileLayout.matches
        ? project.graph.nodes.find((node) => node.id === edge.to).mobilePosition[0]
        : project.graph.nodes.find((node) => node.id === edge.to).position[0];
      let start;
      let end;
      let d;
      if (Math.abs(sourceRect.left + sourceRect.width / 2 - targetRect.left - targetRect.width / 2) < 1) {
        const downward = targetRect.top > sourceRect.top;
        start = pointFor(sourceRect, stageRect, downward ? "bottom" : "top");
        end = pointFor(targetRect, stageRect, downward ? "top" : "bottom");
        d = `M ${start.x} ${start.y} V ${end.y}`;
      } else if (Math.abs(sourceRect.top + sourceRect.height / 2 - targetRect.top - targetRect.height / 2) < 1) {
        const rightward = targetRect.left > sourceRect.left;
        start = pointFor(sourceRect, stageRect, rightward ? "right" : "left");
        end = pointFor(targetRect, stageRect, rightward ? "left" : "right");
        d = `M ${start.x} ${start.y} H ${end.x}`;
      } else {
        const rightward = targetCol > sourceCol;
        start = pointFor(sourceRect, stageRect, rightward ? "right" : "left");
        end = pointFor(targetRect, stageRect, rightward ? "left" : "right");
        const elbowX = rightward
          ? (sourceRect.right + targetRect.left) / 2 - stageRect.left
          : (sourceRect.left + targetRect.right) / 2 - stageRect.left;
        d = `M ${start.x} ${start.y} H ${elbowX} V ${end.y} H ${end.x}`;
      }
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "map-edge");
      path.setAttribute("marker-end", "url(#atlas-arrow)");
      path.dataset.from = edge.from;
      path.dataset.to = edge.to;
      path.dataset.startX = String(start.x);
      path.dataset.startY = String(start.y);
      path.dataset.endX = String(end.x);
      path.dataset.endY = String(end.y);
      mapEdges.append(path);
    }
  }

  projectButtons.forEach((button) => {
    button.addEventListener("click", () => renderProject(button.dataset.project));
  });

  $(".copy-email").addEventListener("click", async () => {
    const email = $(".copy-email").dataset.copyEmail;
    const status = $(".copy-status");
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }
      status.textContent = "Email copiado al portapapeles.";
    } catch {
      status.textContent = `No se pudo copiar. Podés seleccionar el email: ${email}`;
    }
  });

  window.addEventListener("resize", scheduleEdges, { passive: true });
  mobileLayout.addEventListener("change", () => {
    renderMap(projects[activeProject]);
  });
  if (stage && "ResizeObserver" in window) {
    const observer = new ResizeObserver(scheduleEdges);
    observer.observe(stage);
  }
  if (document.fonts?.ready) document.fonts.ready.then(scheduleEdges);
  renderProject(activeProject);
})();
