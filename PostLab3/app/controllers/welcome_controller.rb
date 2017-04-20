class WelcomeController < ApplicationController
  def index
  end

  def registro_api
  	if user_signed_in?
  		redirect_to '/', notice: 'Ya iniciaste sesión.'
  	end
  end
end
