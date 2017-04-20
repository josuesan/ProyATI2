require 'test_helper'

class ProdcartsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get prodcarts_index_url
    assert_response :success
  end

end
