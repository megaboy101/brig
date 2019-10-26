defmodule BrigWeb.EchoChannel do
  use Phoenix.Channel

  def join("echo:" <> _anything, _message, socket) do
    {:ok, socket}
  end

  def handle_in("echo", payload, socket) do
    IO.inspect(payload)
    broadcast!(socket, "echo", payload)
    {:reply, :ok, socket}
  end
end
