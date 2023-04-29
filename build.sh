echo "Building..."

echo "" > ./out.js

# for i in $(ls ./libs);
# do
#     cat ./libs/$i >> ./out.js
#     echo "" >> ./out.js
# done

for i in $(ls ./functions);
do
    cat ./functions/$i >> ./out.js
    echo "" >> ./out.js
done

for i in $(ls ./commands);
do
    cat ./commands/$i >> ./out.js
    echo "" >> ./out.js
done

cat ./main/main.js >> ./out.js

echo "Done building!"
