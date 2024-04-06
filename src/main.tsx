import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App/App"
import { store } from "./store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "antd"
import locale from "antd/locale/ru_RU"
import "@fontsource/roboto/cyrillic-400.css"
import "@fontsource/roboto/cyrillic-500.css"
import "@fontsource/roboto/cyrillic-700.css"

import "./assets/styles/main.css"

//Fix 'findDOMNode' warning in ant design
const consoleError = console.error.bind(console)
console.error = (errObj, ...args) => {
  if (typeof errObj === "string" && args.includes("findDOMNode")) {
    return
  }
  consoleError(errObj, ...args)
}
//end fix

const container = document.getElementById("root")

const queryClient = new QueryClient()

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ConfigProvider
            locale={locale}
            theme={{
              token: {
                fontFamily: "Roboto, sans-serif",
                fontSize: 16,
                colorText: "#404140",
              },
            }}
          >
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
