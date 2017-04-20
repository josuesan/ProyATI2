class ProdcartsController < ApplicationController
  def index
  	totalprod = Prodcart.find_by username: current_user.username
  end
end
