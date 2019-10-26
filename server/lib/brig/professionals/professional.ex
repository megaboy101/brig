defmodule Brig.Professionals.Professional do
  use Ecto.Schema
  import Ecto.Changeset

  schema "professionals" do
    field :age, :integer
    field :description, :string
    field :gender, :string
    field :is_religious, :boolean, default: false
    field :is_spiritual, :boolean, default: false
    field :latitude, :decimal
    field :longitude, :decimal
    field :name, :string
    field :political_alignment, :string
    field :rate, :integer
    field :services, {:array, :string}
    field :specialties, {:array, :string}

    timestamps()
  end

  @doc false
  def changeset(professional, attrs) do
    professional
    |> cast(attrs, [:name, :age, :rate, :latitude, :longitude, :description, :specialties, :services, :gender, :is_religious, :is_spiritual, :political_alignment])
    |> validate_required([:name, :age, :rate, :latitude, :longitude, :description, :specialties, :services, :gender, :is_religious, :is_spiritual, :political_alignment])
  end
end
