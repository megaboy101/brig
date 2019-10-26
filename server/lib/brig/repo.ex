defmodule Brig.Repo do
  use Ecto.Repo,
    otp_app: :brig,
    adapter: Ecto.Adapters.Postgres
end
