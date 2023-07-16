HandlerList = {};
window.addContextMenu = function (id, ref) {
    var el = document.getElementById(id);
    if (el) {
        var handler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            ref.invokeMethodAsync('BaseComponent.RaiseContextMenu',
                {
                    ClientX: e.clientX,
                    ClientY: e.clientY,
                    ScreenX: e.screenX,
                    ScreenY: e.screenY,
                    AltKey: e.altKey,
                    ShiftKey: e.shiftKey,
                    CtrlKey: e.ctrlKey,
                    MetaKey: e.metaKey,
                    Button: e.button,
                    Buttons: e.buttons,
                });
            return false;
        };
        HandlerList[id + 'contextmenu'] = handler;
        el.addEventListener('contextmenu', handler, false);
    }
}

window.addMouseEnter = function (id, ref) {
    var el = document.getElementById(id);
    if (el) {
        var handler = function (e) {
            ref.invokeMethodAsync('BaseComponent.RaiseMouseEnter');
        };
        HandlerList[id + 'mouseenter'] = handler;
        el.addEventListener('mouseenter', handler, false);
    }
}

window.addMouseLeave = function (id, ref) {
    var el = document.getElementById(id);
    if (el) {
        var handler = function (e) {
            ref.invokeMethodAsync('BaseComponent.RaiseMouseLeave');;
        };
        HandlerList[id + 'mouseleave'] = handler;
        el.addEventListener('mouseleave', handler, false);
    }
}

window.removeContextMenu = function (id) {
    var el = document.getElementById(id);
    if (el && HandlerList[id + 'contextmenu']) {
        el.removeEventListener('contextmenu', HandlerList[id + 'contextmenu']);
    }
}

window.removeMouseEnter = function (id) {
    var el = document.getElementById(id);
    if (el && HandlerList[id + 'mouseenter']) {
        el.removeEventListener('mouseenter', HandlerList[id + 'mouseenter']);
    }
}

window.removeMouseLeave = function (id) {
    var el = document.getElementById(id);
    if (el && HandlerList[id + 'mouseleave']) {
        el.removeEventListener('mouseleave', HandlerList[id + 'mouseleave']);
    }
}

window.createScheduler = function (ref, instance) {
    ref.resizeHandler = function () {
        var rect = ref.getBoundingClientRect();

        instance.invokeMethodAsync('Resize', rect.width, rect.height);
    };

    window.addEventListener('resize', ref.resizeHandler);

    var rect = ref.getBoundingClientRect();
    return { width: rect.width, height: rect.height };
}

window.destroyScheduler = function (ref) {
    if (ref.resizeHandler) {
        window.removeEventListener('resize', ref.resizeHandler);
        delete ref.resizeHandler;
    }
}

async function downloadFileFromStream(fileName, contentStreamReference) {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.download = fileName;
    link.href = url
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
}

async function openFileInNewTab(array, mimeType) {
    var file = new Blob([array], { type: mimeType });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
}
