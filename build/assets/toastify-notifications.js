import Toastify from 'toastify-js'

document.addEventListener("DOMContentLoaded", () => {
    if (CCM_EDIT_MODE) {
        return
    }

    const alerts = document.querySelectorAll(".alert")

    const getCSSVariable = (name) => {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    }

    const getAlertColors = (type) => {
        // Fallback colors if CSS variables are not found
        const fallback = {
            success: { bg: '#198754', fg: '#fff' },
            danger: { bg: '#dc3545', fg: '#fff' },
            warning: { bg: '#ffc107', fg: '#212529' },
            info: { bg: '#0dcaf0', fg: '#000' },
            primary: { bg: '#0d6efd', fg: '#fff' },
            secondary: { bg: '#6c757d', fg: '#fff' },
            light: { bg: '#f8f9fa', fg: '#000' },
            dark: { bg: '#212529', fg: '#fff' }
        }

        const cssBg = getCSSVariable(`--bs-${type}`)
        const cssFg = getCSSVariable(`--bs-${type}-text`) || (type === 'light' ? '#000' : '#fff')

        return {
            backgroundColor: cssBg || fallback[type].bg,
            color: cssFg || fallback[type].fg
        }
    }

    alerts.forEach(alert => {
        const message = alert.textContent.trim()
        const classes = alert.classList

        let type = 'primary' // default
        for (const t of ['success', 'danger', 'warning', 'info', 'primary', 'secondary', 'light', 'dark']) {
            if (classes.contains(`alert-${t}`)) {
                type = t
                break
            }
        }

        const { backgroundColor, color } = getAlertColors(type)

        Toastify({
            text: message,
            duration: 8000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: backgroundColor,
            style: {
                color: color
            },
            stopOnFocus: true
        }).showToast()

        alert.remove()
    })
})
