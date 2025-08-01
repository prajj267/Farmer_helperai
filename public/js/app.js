// public/js/app.js
document.addEventListener('DOMContentLoaded', () => {
    const queryForm = document.getElementById('query-form');
    const queryInput = document.getElementById('user-query');
    const resultsContainer = document.getElementById('results-container');
    const aiResponseDiv = document.getElementById('ai-response');

    queryForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission (page reload)

        const query = queryInput.value.trim();
        if (!query) {
            alert('Please enter a question.');
            return;
        }

        // Show the results container and a loading state
        resultsContainer.classList.remove('hidden');
        aiResponseDiv.innerHTML = `
            <div class="flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-400"></div>
                <p class="ml-3 text-gray-400">Analyzing your question...</p>
            </div>
        `;

        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Display the AI's answer
            aiResponseDiv.textContent = data.answer;

        } catch (error) {
            console.error('Error fetching AI response:', error);
            aiResponseDiv.textContent = 'Sorry, something went wrong. Please try again later.';
            aiResponseDiv.classList.add('text-red-400');
        }
    });
});