import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App/App"
import { store } from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"

import "./assets/styles/main.css"

const container = document.getElementById("root")

const queryClient = new QueryClient()

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                fontSize: 16,
                colorText: "#404140",
              },
            }}
          >
            {" "}
            <App />
          </ConfigProvider>
        </Provider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
