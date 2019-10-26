defmodule BrigWeb.Router do
  use BrigWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", BrigWeb do
    pipe_through :api

    get("/professionals", ProfessionalController, :all)
  end
end
