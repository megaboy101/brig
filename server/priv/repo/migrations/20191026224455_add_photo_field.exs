defmodule Brig.Repo.Migrations.AddPhotoField do
  use Ecto.Migration

  def change do
    alter table(:professionals) do
      add :photo, :string
    end
  end
end
