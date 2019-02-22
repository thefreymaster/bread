import React from 'react'
import { Icon, notification } from 'antd'

function showNotification(message, description, color, icon){
    notification.open({
        message: message,
        description: description,
        onClick: () => {
            notification.destroy()
        },
        duration: 10,
        icon: <Icon type={icon} style={{ color: color }} />,
    });
}

export { showNotification }