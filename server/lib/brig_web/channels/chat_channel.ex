defmodule BrigWeb.ChatChannel do
  use Phoenix.Channel

  require Logger

  def join("chat:" <> _subtopic, _message, socket) do
    {:ok, socket}
  end

  def handle_in("message", payload, socket) do
    Logger.debug("Message Recieved: #{inspect(payload)}")
    broadcast!(socket, "message", payload)
    {:noreply, socket}
  end
end
